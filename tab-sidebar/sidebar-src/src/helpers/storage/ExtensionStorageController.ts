import { gracefullySuppressErrors } from 'helpers/utils/helpers';
import { StorageController } from './StorageController';

export class ExtensionStorageController implements StorageController {
  getItem(key: string): Promise<string> {
    return gracefullySuppressErrors(async () => {
      const dict = await browser.storage.local.get(key);

      if (typeof dict[key] !== 'undefined') {
        return dict[key];
      }

      return '';
    }, Promise.resolve(''));
  }


  setItem(key: string, value: string) {

    return gracefullySuppressErrors(async () => {
      await browser.storage.local.set({
        [key]: value
      });
    }, undefined);

  }

}

export const extensionStorageController = new ExtensionStorageController();
