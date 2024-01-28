import { TabItemType } from '@/components/TabItem/types';

export interface TabController {
  queryTabs: (queryStr: string)=>TabItemType[];
  toggleMuteForTab: (tabId: string, isMuted: boolean)=>void;
  closeTab: (tabId: string)=>void;
  openTab: (tabId: string)=>void;
  subscribeToTabFocused: (tabId?: string)=>void;
  subscribeToTabsMoved: ()=>void;
  subscribeToTabActivated: (activeTabId?: string)=>void;
}
