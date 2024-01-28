import Icon from '../Icon';
import { debounce } from 'helpers/utils';
import { firefoxTabController } from 'helpers/tabs/FirefoxTabController';
import { useTabListItems } from '../TabListContainer/tabList.state';
import { useSearchBar } from './useSearchBar';
import { createEffect } from 'solid-js';


const SearchBar = () => {

  const [ searchString, setSearchString ] = useSearchBar();
  const [ , setTabListItemsState ] = useTabListItems();
  const debounceFn = debounce(
    async (newValue: string) => {
      const queriedTabs = await firefoxTabController.queryTabs(newValue);

      setTabListItemsState(queriedTabs);
    }
  );

  createEffect(() => {
    debounceFn(searchString());
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
