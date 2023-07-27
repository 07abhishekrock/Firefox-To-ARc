import * as React from 'react';
import { FaArrowCircleUp, FaHistory } from 'react-icons/fa';
import cn from 'classnames';
import { limitToMaxChars } from '../../utils/helpers';

//focus:bg-nord4 focus:text-nord1

const SearchItem = ({ keyword, isFocused, itemType }: {keyword: string; isFocused?: boolean; itemType: 'history' | 'search'}) => {
  return <div className={
    cn('p-3 pl-4 pr-4 flex items-center gap-2 tracking-wider rounded-lg cursor-pointer select-none',
      {
        ['bg-nord4 text-nord2']: isFocused,
        ['hover:bg-focusedClr hover:text-nord4' ]: !isFocused
      },
      'transition-colors'
    )
  }
  >
    {
      itemType === 'search' && <FaArrowCircleUp size={18}
        className="text-nord15 shrink-0"
      />
    }
    {
      itemType === 'history' && <FaHistory size={18}
        className="text-nord15 shrink-0"
      />
    }
    <h3 className="text-lg m-0 overflow-ellipsis whitespace-nowrap overflow-hidden">{limitToMaxChars(keyword, 40)}</h3>
  </div>;
};

const SearchItemMemo = React.memo(SearchItem);

export default SearchItemMemo;
