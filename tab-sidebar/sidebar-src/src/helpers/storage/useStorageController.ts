import { extensionStorageController } from './ExtensionStorageController';
import { StorageController } from './StorageController';

export const useStorageController = (): StorageController => {
  return extensionStorageController;
};
