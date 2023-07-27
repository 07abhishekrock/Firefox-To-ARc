export type TabItem = {
  type: 'tab';
  favicon: string;
  title: string;
  tabId?: number;
  audible?: boolean;
  muted?: boolean;
  active?: boolean;
  url?: string;
}


export type SearchItem = {
  type: 'search';
  keyword: string;
  itemType: 'search' | 'history';
  url?: string;
  id: string;
}

export type TabGroup = {
  type: 'tab-group';
  name: string;
}

export type TabItemOrGroup = TabGroup | TabItem;

export type SearchResult = TabItem | SearchItem | TabGroup;
