import { firefoxTabController } from './FirefoxTabController';
import { TabController } from './TabController';


export const useTabController = (): TabController => {
  return firefoxTabController;
};
