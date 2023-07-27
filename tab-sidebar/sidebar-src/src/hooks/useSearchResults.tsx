import { useCallback, useEffect, useState } from 'react';
import { SearchItem, SearchResult, TabItemOrGroup } from '../types';
import { v4 as uuidv4 } from 'uuid';


const getAllTabsMatchingString = async (query = ''): Promise<TabItemOrGroup[]> => {
  if (typeof browser !== 'undefined') {
    const regex = query ? new RegExp(`.*${query}.*`, 'gi') : new RegExp('', 'gi');
    const allTabs = await browser.tabs.query({});

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

    const lastGoogleSearchItem = {
      type: 'search' as const,
      itemType: 'search' as const,
      keyword: searchQuery,
      id: uuidv4()
    };

    getAllTabsMatchingString(searchQuery).then(items => {

      if (!searchQuery) {
        setSearchResults(items);
        return;
      }

      if (items.length < 7) {

        getHistoryItems(searchQuery, (7 - items.length - 1)).then(historyItems => {
          const googleSearchItem = searchQuery ? [ lastGoogleSearchItem ] : [];
          const newSearchResults = [ ...items, ...historyItems, ...googleSearchItem ];

          setSearchResults(newSearchResults);
        }).catch(() => {

          const googleSearchItem = searchQuery ? [ lastGoogleSearchItem ] : [];
          const newSearchResults = [ ...items, ...googleSearchItem ];

          setSearchResults(newSearchResults);

        });

      } else {
        const googleSearchItem = searchQuery ? [ lastGoogleSearchItem ] : [];

        setSearchResults([ ...items, ...googleSearchItem ]);
      }

    });
  }, []);


  useEffect(() => {
    resetSearchResults(searchQuery);
  }, [ resetSearchResults, searchQuery ]);

  return {
    searchResults,
    focusedIndex,
    focusResult: setFocusedIndex,
    resetSearchResults,
    unfocusAllResults() {
      setFocusedIndex(-1);
    }
  };
};
