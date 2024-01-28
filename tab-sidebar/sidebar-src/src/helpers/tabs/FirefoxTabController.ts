import { TabItemType } from '@/components/TabItem/types';
import { TabController } from './TabController';
import { gracefullySuppressErrors } from 'helpers/utils/helpers';

export class FirefoxTabController implements TabController {

  constructor() {
    if (typeof window === 'undefined' && typeof browser === 'undefined') {
      throw new Error('Browser is undefined');
    }
  }


  static transformToMatchTabType(tab: browser.tabs.Tab): TabItemType {
    return {
      id: tab.id,
      image: tab.favIconUrl,
      title: tab.title,
      url: tab.url,
      isActive: tab.active,
      isMuted: tab.mutedInfo?.muted,
      isAudioTab: tab.audible,
      containerId: tab.cookieStoreId
    };
  }


  queryTabs = async (queryStr: string) => {

    return gracefullySuppressErrors(async () => {
      const allTabs = await browser.tabs.query(
        {
          currentWindow: true
        }
      );

      const queryMatcher = this.doesQueryMatchWithTab(queryStr);

      return allTabs.filter(tab => {

        if (queryStr.trim().length === 0) {
          return true;
        }

        return queryMatcher(tab.title, tab.url);

      }).map(FirefoxTabController.transformToMatchTabType);
    }, Promise.resolve([]));

  };


  toggleMuteForTab = async (tabId: number, isMuted: boolean) => {

    return gracefullySuppressErrors(async () => {
      await browser.tabs.update(tabId, {
        muted: isMuted
      });

    }, undefined);
  };


  closeTab = async (tabId: number) => {

    return gracefullySuppressErrors(async () => {
      await browser.tabs.remove(tabId);
    }, undefined);

  };


  activateTab = (tabId: number) => {

    browser.tabs.update(tabId, {
      active: true
    });
  };


  openTab = async (url: string, extraArgs?: Partial<TabItemType>) => {

    return gracefullySuppressErrors(async () => {
      await browser.tabs.create({
        url,
        ...extraArgs
      });
    }, undefined);
  };


  subscribeToTabUpdated = (callback: (nTab: TabItemType) => void) => {
    const mCallback = async (tabId: number, changeInfo: browser.tabs._OnUpdatedChangeInfo) => {

      const tabData = await browser.tabs.get(tabId);

      callback(FirefoxTabController.transformToMatchTabType({
        ...tabData,
        ...changeInfo
      }));

    };

    browser.tabs.onUpdated.addListener(mCallback);
    return () => browser.tabs.onUpdated.removeListener(mCallback);
  };


  subscribeToTabCreated = (callback: (newTab: TabItemType) => void) => {

    const mCallback = (tab: browser.tabs.Tab) => {
      callback(FirefoxTabController.transformToMatchTabType(tab));
    };

    browser.tabs.onCreated.addListener(mCallback);
    return () => browser.tabs.onCreated.removeListener(mCallback);
  };


  subscribeToTabRemoved = (callback: (removedTabId?: number) => void) => {

    const mCallback = (tabId: number) => {
      callback(tabId);
    };

    browser.tabs.onRemoved.addListener(mCallback);
    return () => browser.tabs.onRemoved.removeListener(mCallback);
  };


  subscribeToTabActivated = (callback: (activatedTabId: number, previousTabId?: number) => void) => {

    const mCallback = (activeInfo: browser.tabs._OnActivatedActiveInfo) => {
      callback(activeInfo.tabId, activeInfo.previousTabId);
    };

    browser.tabs.onActivated.addListener(mCallback);
    return () => browser.tabs.onActivated.removeListener(mCallback);
  };


  doesQueryMatchWithTab = (queryString: string) => {

    if (queryString.trim().length === 0) {
      return () => true;
    }

    const regexp = new RegExp(`.*${queryString}.*`, 'gi');

    return (tabTitle?: string, tabUrl?: string) => {

      const doesTitleMatch = tabTitle && regexp.test(tabTitle);
      const doesURLMatch = tabUrl && regexp.test(tabUrl);

      return !!(doesURLMatch || doesTitleMatch);

    };

  };


}

export const firefoxTabController = new FirefoxTabController();
