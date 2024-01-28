export interface StorageController {

  getItem(key: string): Promise<string>;
  setItem(key: string, value: string): void;

}
