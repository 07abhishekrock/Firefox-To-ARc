import * as React from 'react';
import cn from 'classnames';
import { FaFirefoxBrowser } from 'react-icons/fa';
import { MdClose, MdVolumeOff, MdVolumeUp } from 'react-icons/md';
import { animated, useSpringValue } from '@react-spring/web';
import Pressable from '../Pressable';


type TabItemProps = {
  favicon: string;
  title: string;
  isFocused?: boolean;
  tabId?: number;
  audible?: boolean;
  muted?: boolean;
}


const TabItem = ({
  favicon,
  title,
  isFocused,
  tabId,
  audible,
  muted
}: TabItemProps) => {

  const activateCurrentTab: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof browser !== 'undefined') {
      tabId && browser.tabs.update(tabId, {
        active: true
      });
    }
  };


  const toggleSoundOnTab: React.MouseEventHandler<SVGElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof browser !== 'undefined') {
      tabId && browser.tabs.update(tabId, {
        muted: !muted
      });
    }
  };


  const closeTab: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof browser !== 'undefined') {
      tabId && browser.tabs.remove([ tabId ]);
    }
  };

  const [ error, setError ] = React.useState(false);
  const iconScale = useSpringValue(0);
  const tabDivRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (isFocused) {
      tabDivRef.current?.scrollIntoView();
    }
  }, [ isFocused ]);

  return <div
    onMouseEnter={() => iconScale.start(20)}
    onMouseLeave={() => iconScale.start(0)}
    onClick={activateCurrentTab}
    ref={tabDivRef}
    className={
      cn('p-3 pl-4 pr-4 flex items-center gap-2 tracking-wider rounded-lg cursor-pointer select-none outline-none',
        {
          ['bg-nord4 text-nord2']: isFocused,
          ['hover:bg-focusedClr hover:text-nord4' ]: !isFocused
        },
        'transition-colors'
      )
    }
  >
    {
      (favicon && !error) ? <img src={favicon}
        onError={setError.bind(null, true)}
        className={'rounded-xl object-center w-[20px] h-[20px] mt-1 block border-nord15 flex-shrink-0'}
        alt={title}
      /> : <FaFirefoxBrowser size={20}
        className="flex-shrink-0"
      />
    }
    <h3 className="text-lg m-0 overflow-ellipsis whitespace-nowrap overflow-hidden flex-grow">{title}</h3>
    {
      (audible && !muted) ? <Pressable>
        <MdVolumeUp onClick={toggleSoundOnTab}
          className={'flex-shrink-0'}
          size={20}
        />
      </Pressable> : null
    }
    {
      muted ? <Pressable>
        <MdVolumeOff onClick={toggleSoundOnTab}
          className={'flex-shrink-0'}
          size={20}
        />
      </Pressable>
      : null
    }
    <animated.div className="flex-shrink-0 text-nord15"
      onClick={closeTab}
      style={
        {
          width: iconScale,
          height: iconScale,
          overflow: 'hidden'
        }
      }
    >
      <Pressable>
        <MdClose size={20}/>
      </Pressable>
    </animated.div>
  </div>;

};

const TabItemMemo = React.memo(TabItem);

export default TabItemMemo;
