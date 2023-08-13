import { useCallback, useEffect, useState } from 'react';
import { SearchItem, SearchResult, TabItemOrGroup } from '../types';
import { v4 as uuidv4 } from 'uuid';


const getAllTabsMatchingString = async (query = '', cookieStoreId?: string): Promise<TabItemOrGroup[]> => {
  if (typeof browser !== 'undefined') {
    const regex = query ? new RegExp(`.*${query}.*`, 'gi') : new RegExp('', 'gi');
    const allTabs = await browser.tabs.query({
      cookieStoreId
    });

    return allTabs.map((tab) => {
      return {
        type: 'tab' as const,
        favicon: tab.favIconUrl ?? '',
        title: tab.title ?? tab.url ?? '',
        tabId: tab.id,
        audible: tab.audible,
        muted: tab.mutedInfo?.muted,
        url: tab.url
      };
    }).filter(s => s.title && regex.test(s.title));
  }

  return [];
};


const getHistoryItems = async (query = '', totalResults = 5): Promise<SearchItem[]> => {
  if (typeof browser !== 'undefined') {
    const historyItems = await browser.history.search({
      text: query,
      maxResults: totalResults
    });

    return historyItems.map(item => ({
      id: item.id,
      type: 'search' as const,
      keyword: item.title ?? '',
      url: item.url ?? '',
      itemType: 'history' as const
    }))
      .filter(s => s.keyword && s.url);
  }

  return [];
};


export const useSearchResults = (searchQuery = '') => {

  const [ focusedIndex, setFocusedIndex ] = useState(0);
  const [ searchResults, setSearchResults ] = useState<SearchResult[]>([]);

  const resetSearchResults = useCallback((searchQuery: string) => {

    getAllTabsMatchingString(searchQuery).then(items => {
      setSearchResults(items);
    });
  }, []);

  const removeTab = useCallback((tabId: number) => {
    setSearchResults(old => {
      return old.filter(o => {
        return o.type === 'tab' && o.tabId !== tabId;
      });

    });
  }, []);


  const updateTab = useCallback((tabId: number, updatePayload: browser.tabs._UpdateUpdateProperties) => {
    setSearchResults(old => {
      return old.map(o => {
        if (o.type === 'tab' && o.tabId === tabId) {
          return {
            ...o,
            ...updatePayload
          };
        }

        return o;
      });
    });
  }, []);


  useEffect(() => {
    resetSearchResults(searchQuery);
  }, [ resetSearchResults, searchQuery ]);

  return {
    searchResults,
    focusedIndex,
    focusResult: setFocusedIndex,
    removeTab,
    updateTab,
    resetSearchResults,
    unfocusAllResults() {
      setFocusedIndex(-1);
    }
  };
};
