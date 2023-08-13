import { create } from 'zustand';


type Store = {
  profile?: browser.contextualIdentities.ContextualIdentity;
  changeProfile: (newProfileName: browser.contextualIdentities.ContextualIdentity)=>void;
}

export const useProfile = create<Store>((set) => {
  return {
    profile: undefined,
    changeProfile(newProfile) {
      set(s => ({
        ...s,
        profile: newProfile
      }));
    }
  };
});
