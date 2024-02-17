import { createEffect, createSignal } from 'solid-js';
import { TabItemType } from '../TabItem/types';
import { ProfileItem, allTabsProfile } from 'helpers/profile/ProfileController';
import { useStorageController } from 'helpers/storage/useStorageController';
import { safeJsonParse } from 'utils/helpers';
import { useProfileController } from 'helpers/profile/useProfileController';
import { gracefullySuppressErrors } from 'helpers/utils/helpers';
import { useMessageController } from 'helpers/message/useMessageController';
import { useTabController } from 'helpers/tabs/controller';

export const LAST_SELECTED_PROFILE_KEY = 'last-selected-profile';
export const PROFILE_CHANGE_MESSAGE_KEY = 'profile-changed';


const [ tabListItemsState, setTabListItemsState ] = createSignal<TabItemType[]>([]);
const [ profileKey, setProfileKey ] = createSignal<ProfileItem | undefined>(undefined);


export function subscribeToExternalProfileChange() {

  //eslint-disable-next-line
  const profileController = useProfileController();

  //eslint-disable-next-line
  return useMessageController().subscribeToMessage((msgType, msgData) => {
    if (msgType === PROFILE_CHANGE_MESSAGE_KEY) {
      gracefullySuppressErrors(() => {
        if (!msgData) return;
        profileController.setProfile(msgData);
      }, null);
    }
  });

}

export async function initializeProfile() {


  //eslint-disable-next-line
	const profile = await useStorageController().getItem(LAST_SELECTED_PROFILE_KEY)
  //eslint-disable-next-line
	const profileController = useProfileController()
  //eslint-disable-next-line
	const setProfileInStorage = useStorageController().setItem.bind(null, LAST_SELECTED_PROFILE_KEY)


  //eslint-disable-next-line
	const allProfiles = await useProfileController().listAllProfiles()

  if (typeof profile === 'undefined' || profile === null || !profile) {
    const profileToSet = allTabsProfile;

    profileController.setProfile(profileToSet);
    setProfileInStorage(JSON.stringify(profileToSet));

  } else {
    const profileToSet = safeJsonParse(profile) as ProfileItem;

    if (profileToSet) {
      profileController.setProfile(profileToSet);
    }
  }

}

export const useTabListItems = () => {

  return [ tabListItemsState, setTabListItemsState ] as ReturnType<typeof createSignal<TabItemType[]>>;
};

export const useCurrentProfile = () => {
  return [ profileKey, setProfileKey ] as ReturnType<typeof createSignal<ProfileItem>>;
};


export enum MEDIA_TYPE_KEYS {
  YOUTUBE,
  MEETS,
  YOUTUBE_MUSIC
}

const WHITELISTED_ENTRIES = {
  [MEDIA_TYPE_KEYS.YOUTUBE_MUSIC]: [ 'music.youtube.com', 'www.music.youtube.com' ],
  [MEDIA_TYPE_KEYS.YOUTUBE]: [ 'youtube.com', 'www.youtube.com' ],
  [MEDIA_TYPE_KEYS.MEETS]: [ 'meet.google.com', 'www.meet.google.com' ]
};

export const [ audibleTabs, setAudibleTabs ] = createSignal<{
  [key: string]: TabItemType[];
}>({});

export const useCurrentAudibleTabs = () => {

  const [ allTabs ] = useTabListItems();

  createEffect(() => {
    const audibleTabsLatest = Object.entries(WHITELISTED_ENTRIES).reduce((
      tabsDict,
      [ mediaType, whitelistedUrls ]
    ) => {
      tabsDict[mediaType] = allTabs().filter(t => {
        try {
          const urlDomain = new URL(t.url ?? '');

          return whitelistedUrls.includes(urlDomain.hostname);

        } catch (e) {
          return false;
        }
      }
      ).sort(tD => tD.isAudioTab === true ? -1 : 1);

      return tabsDict;
    }, {} as {[key: string]: TabItemType[]});

    setAudibleTabs(audibleTabsLatest);

  });

};

export const useTabListItemsBasedOnSearch = (searchString: string) => {

  const tabController = useTabController();

  return tabController.doesQueryMatchWithTab(searchString);

};
