import Icon from '../Icon';
import { useSearchBar } from './useSearchBar';


const SearchBar = () => {

  const [ searchString, setSearchString ] = useSearchBar();

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
