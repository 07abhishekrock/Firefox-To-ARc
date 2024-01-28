import Icon from '../Icon';
import { debounce } from 'helpers/utils';
import { firefoxTabController } from 'helpers/tabs/FirefoxTabController';
import { useCurrentProfile, useTabListItems } from '../TabListContainer/tabList.state';
import { useSearchBar } from './useSearchBar';
import { createEffect } from 'solid-js';
import { ProfileItem, allTabsProfile } from 'helpers/profile/ProfileController';
import { TabItemType } from '../TabItem/types';
import { useCurrentTabFilter } from '../Header/currentTabsType.state';


const SearchBar = () => {

  const [ searchString, setSearchString ] = useSearchBar();
  const [ profile ] = useCurrentProfile();

  const tabFilter = useCurrentTabFilter();
  const [ , setTabListItemsState ] = useTabListItems();

  const debounceFn = debounce(
    async (newValue: string) => {
      const queriedTabs = await firefoxTabController.queryTabs(newValue);
      let filteredTabs: TabItemType[] = [];

      if (profile().id === allTabsProfile.id) {
        filteredTabs = queriedTabs.filter(t => tabFilter(t.url ?? ''));

      } else {
        filteredTabs = queriedTabs.filter(s => {
          return s.containerId === profile().id && tabFilter(s.url ?? '');
        });
      }

      setTabListItemsState(filteredTabs);
    }
  );

  createEffect(() => {
    debounceFn(searchString(), profile(), tabFilter);
  });

  return <div class="search_bar">
    <Icon sizeType="medium"
      iconName="search"
    />
    <input
      type="text"
      class="search_bar__input"
      placeholder="Search Anything"
      value={searchString()}
      oninput={
        e => {
          setSearchString(e.currentTarget.value);
        }
      }
    />
  </div>;
};

export default SearchBar;
