import { TabItemType } from '@/components/TabItem/types';

export interface TabController {
  queryTabs: (queryStr: string) => Promise<TabItemType[]>;
  toggleMuteForTab: (tabId: number, isMuted: boolean)=>Promise<void>;
  closeTab: (tabId: number)=>Promise<void>;
  openTab: (url: string, extraArgs?: Partial<TabItemType>)=>Promise<void>;
  activateTab: (tabId: number)=>void;
  subscribeToTabUpdated: (callback: (tab: TabItemType)=>void)=>()=>void;
  subscribeToTabCreated: (callback: (newTab: TabItemType)=>void)=>()=>void;
  subscribeToTabRemoved: (callback: (removedTabId?: number)=>void)=>()=>void;
  subscribeToTabActivated: (callback: (activatedTabId: number, previousTabId?: number)=>void)=>()=>void;
  doesQueryMatchWithTab: (queryString: string) => (tabTitle?: string, tabUrl?: string)=>boolean;
}
