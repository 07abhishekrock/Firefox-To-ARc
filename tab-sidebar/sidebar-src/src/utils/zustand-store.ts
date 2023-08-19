import {createJSONStorage} from "zustand/middleware";

export const zustandExtensionStorage = createJSONStorage(() => {
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
