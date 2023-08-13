import * as React from 'react';

import { useSearchResults } from '../../hooks/useSearchResults';
import SearchBar from '../SearchBar';
import SearchItem from '../SearchItem';
import TabItem from '../TabItem';


const SearchResults = () => {
  const [ searchString, setSearchString ] = React.useState('');
  const { searchResults, focusResult, resetSearchResults, removeTab, updateTab } = useSearchResults(searchString);
  const [ currentFocusedId, setCurrentFocusedId ] = React.useState<string | undefined | null>(null);


  const loadCurrentTab = async () => {
    const [ newCurrentTab ] = await browser.tabs.query({ active: true });

    setCurrentFocusedId(newCurrentTab.id?.toString());

    return newCurrentTab;
  };

  React.useEffect(() => {
    const onTabUpdatedOrChanged = () => {
      resetSearchResults(searchString);
    };


    const onTabsMoved = () => {
      resetSearchResults(searchString);
    };


    const onTabActivated = (activeInfo: browser.tabs._OnActivatedActiveInfo) => {
      activeInfo && activeInfo.tabId && setCurrentFocusedId(activeInfo.tabId.toString());
    };

    if (typeof browser !== 'undefined') {
      browser.tabs.onUpdated.addListener(updateTab);
      browser.tabs.onCreated.addListener(onTabUpdatedOrChanged);
      browser.tabs.onRemoved.addListener(removeTab);
      browser.tabs.onActivated.addListener(onTabActivated);
      browser.tabs.onMoved.addListener(onTabsMoved);
    }

    return () => {
      if (typeof browser !== 'undefined') {
        browser.tabs.onUpdated.removeListener(updateTab);
        browser.tabs.onCreated.removeListener(onTabUpdatedOrChanged);
        browser.tabs.onRemoved.removeListener(removeTab);
        browser.tabs.onActivated.removeListener(onTabActivated);
        browser.tabs.onMoved.removeListener(onTabsMoved);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ searchString, removeTab ]);


  React.useEffect(() => {
    loadCurrentTab();
    focusResult(0);

  }, []);


  const updateSearchString = (newSearchString: string) => {
    if (!newSearchString) {
      const firstElement = searchResults[0];

      if (firstElement && firstElement.type === 'tab') {
        setCurrentFocusedId(firstElement.tabId?.toString());
      }

      if (firstElement && firstElement.type === 'search') {
        setCurrentFocusedId(firstElement.id);
      }
    }

    setSearchString(newSearchString);
  };


  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = async (k) => {

    const currentIndex = searchResults.findIndex(s => {
      if (s.type === 'tab') {
        return s.tabId?.toString() === currentFocusedId;
      }

      if (s.type === 'search') {
        return s.id === currentFocusedId;
      }
    });

    if (k.key.toLowerCase() === 'j' && k.ctrlKey) {

      const calculatedNextIndex = (currentIndex + 1) % searchResults.length;
      const newIndex = calculatedNextIndex <= searchResults.length - 1 ? calculatedNextIndex : 0;
      const focusedElement = searchResults[newIndex];

      if (focusedElement.type === 'tab') {
        setCurrentFocusedId(focusedElement.tabId?.toString());

      } else if (focusedElement.type === 'search') {
        setCurrentFocusedId(focusedElement.id);
      }

    } else if (k.key.toLowerCase() === 'k' && k.ctrlKey) {
      const calculatedNextIndex = (currentIndex - 1) % searchResults.length;
      const newIndex = calculatedNextIndex >= 0 ? calculatedNextIndex : searchResults.length - 1;
      const focusedElement = searchResults[newIndex];

      if (focusedElement.type === 'tab') {
        setCurrentFocusedId(focusedElement.tabId?.toString());

      } else if (focusedElement.type === 'search') {
        setCurrentFocusedId(focusedElement.id);
      }

    } else if (k.key.toLowerCase() === 'enter') {
      if (typeof browser !== 'undefined') {
        const hlResult = searchResults[currentIndex];

        if (hlResult.type === 'tab' && hlResult.tabId) {
          browser.tabs.update(hlResult.tabId, { active: true });
        }

        if (hlResult.type === 'search') {

          let url: string = '';

          if (hlResult.itemType === 'history') {

            url = hlResult.url ?? '';

          } else {

            url = `https://www.google.com/search?client=firefox-b-e&q=${hlResult.keyword.split(' ').map(encodeURIComponent).join('+')}`;
          }

          if (k.shiftKey) {
//replace current tab

            const currentTab = await loadCurrentTab();

            currentTab && currentTab.id && browser.tabs.update(currentTab.id, { url });

          } else {
            browser.tabs.create({
              url
            });
          }

        }


      }

    }
  };

  return <>
    <SearchBar onKeyDown={onKeyDown}
      searchString={searchString}
      setSearchString={updateSearchString}
    />
    <div className={'flex gap-2 flex-col overflow-auto flex-grow pr-2 scroll-smooth'}>
      {
        searchResults.map((searchResult) => {
          if (searchResult.type === 'search') {
            return <div key={searchResult.id}>
              <SearchItem keyword={searchResult.keyword}
                isFocused={currentFocusedId === searchResult.id}
                itemType={searchResult.itemType}
              />
            </div>;
          }

          if (searchResult.type === 'tab') {
            return <div key={searchResult.tabId}>
              <TabItem
                title={searchResult.title}
                favicon={searchResult.favicon}
                isFocused={currentFocusedId === searchResult.tabId?.toString()}
                tabId={searchResult.tabId}
                audible={searchResult.audible}
                muted={searchResult.muted}
              />
            </div>;

          }

          return null;

        })
      }
    </div>
  </>;
};

export default SearchResults;
