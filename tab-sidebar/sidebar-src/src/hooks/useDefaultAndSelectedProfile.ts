import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';


type Profile = browser.contextualIdentities.ContextualIdentity


type Store = {
  defaultProfile?: Profile | null;
  defaultProfileConsumed: boolean;
  lastSelectedProfileKey?: Profile | null;
  changeDefaultProfile: (newProfile?: Profile)=>void;
  changeLastSelectedProfile: (newProfile?: Profile)=>void;
  changeDefaultProfileConsumed: (newValue: boolean)=>void;
}

const PROFILE_KEY = 'default-profile-key';


export const useDefaultAndSelectedProfile = create<Store>()(
  persist((set) => {
    return {
      defaultProfile: null,
      defaultProfileConsumed: false,
      lastSelectedProfileKey: null,
      changeDefaultProfileConsumed(newValue: boolean) {
        set(s => ({
          ...s,
          defaultProfileConsumed: newValue
        }));
      },
      changeLastSelectedProfile(newProfile) {
        set(s => ({
          ...s,
          lastSelectedProfileKey: newProfile
        }));
      },
      changeDefaultProfile(newProfile) {
        set(s => ({
          ...s,
          defaultProfile: newProfile
        }));
      }
    };
  }, {
    name: PROFILE_KEY,
    storage: createJSONStorage(() => {
      return {
        getItem: async (name: string) => {
          if (typeof browser !== 'undefined') {
            const storageReadValue = await browser.storage.local.get(name);

            return storageReadValue[name];
          }

          return '';
        },
        setItem: async (name: string, value: string) => {
          if (typeof browser !== 'undefined') {
            await browser.storage.local.set({
              [name]: value
            });
          }
        },
        removeItem: async (name: string) => {
          if (typeof browser !== 'undefined') {
            await browser.storage.local.remove(name);
          }
        }
      };
    })
  }));
