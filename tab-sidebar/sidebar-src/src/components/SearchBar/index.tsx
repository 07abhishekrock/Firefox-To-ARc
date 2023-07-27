import * as React from 'react';
import { FaSearch } from 'react-icons/fa';


type SearchBarProps = {
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  searchString: string;
  setSearchString: (newString: string)=>void;
}


const SearchBar = ({ onKeyDown, searchString, setSearchString }: SearchBarProps) => {

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {

    browser.commands.onCommand.addListener((cmd) => {
      if (cmd === 'sidebar-toggle') {
        inputRef.current?.focus();
      }
    });

    window.addEventListener('SidebarFocused', () => {
      inputRef.current?.focus();
    });
  }, []);

  return <div className="p-3 pl-4 pr-4 bg-nord2 mt-6 mb-3 rounded-lg flex items-center gap-2">
    <FaSearch style={{ color: 'inherit' }}
      size={16}
    />
    <input type="text"
      ref={inputRef}
      className='text-lg bg-nord2 text-nord4 placeholder-placeholder outline-none tracking-wide inter grow'
      placeholder="Search Here"
      value={searchString}
      onChange={(e) => setSearchString(e.target.value)}
      onKeyDown={onKeyDown}
    />
  </div>;
};

export default SearchBar;
