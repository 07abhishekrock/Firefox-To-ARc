import { gracefullySuppressErrors } from 'helpers/utils/helpers';
import { ProfileController, ProfileItem, allTabsProfile } from './ProfileController';

class FirefoxProfileController implements ProfileController {

  private subscribers: Set<Parameters<ProfileController['subscribeToProfileChange']>[0]> = new Set();


  private currentSelectedProfile?: ProfileItem = undefined;


  static transformProfile(profile: browser.contextualIdentities.ContextualIdentity): ProfileItem {
    return {
      id: profile.cookieStoreId,
      color: profile.colorCode,
      name: profile.name
    };
  }


  subscribeToProfileChange(cb: (newProfile: ProfileItem) => void) {
    this.subscribers.add(cb);
    return () => this.subscribers.delete(cb);
  }


  listAllProfiles = () => {
    return gracefullySuppressErrors(async () => {
      const profiles = await browser.contextualIdentities.query({});

      return [
        ...profiles.map(FirefoxProfileController.transformProfile),
        allTabsProfile
      ];
    }, Promise.resolve([] as ProfileItem[]));
  };


  setProfile(newProfile: ProfileItem) {
    gracefullySuppressErrors(async () => {

      this.currentSelectedProfile = newProfile;
      this.subscribers.forEach(c => c(newProfile));

    }, undefined);
  }


  getCurrentProfile() {
    if (!this.currentSelectedProfile) {
      throw new Error('no profile has been setup yet.');
    }

    return this.currentSelectedProfile;
  }

}

export const firefoxProfileController = new FirefoxProfileController();
