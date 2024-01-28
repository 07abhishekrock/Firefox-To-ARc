import { createSignal } from 'solid-js';
import { TabItemType } from '../TabItem/types';
import { ProfileItem } from 'helpers/profile/ProfileController';
import { useStorageController } from 'helpers/storage/useStorageController';
import { safeJsonParse } from 'utils/helpers';
import { useProfileController } from 'helpers/profile/useProfileController';
import { gracefullySuppressErrors } from 'helpers/utils/helpers';
import { useMessageController } from 'helpers/message/useMessageController';

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
    const profileToSet = allProfiles[0];

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
