import * as React from 'react';
import cn from 'classnames';
import { MdClose, MdTab } from 'react-icons/md';
import { animated, useSpringValue } from '@react-spring/web';


type TabGroupProps = React.PropsWithChildren<{
  name: string;
  icon?: string;
  isFocused?: boolean;
}>


const TabGroup = ({
  name,
  icon,
  isFocused,
  children
}: TabGroupProps) => {

  const [ error, setError ] = React.useState(false);
  const rotate = useSpringValue(0);

  const [ collapsed, setIsCollapsed ] = React.useState(false);


  const changeCollapsedState = () => {
    setIsCollapsed(o => {
      if (o === true) {
        rotate.start(0);
        return false;
      }

      rotate.start(180);
      return false;
    });
  };

  return <div className="p-3 pl-4 pr-4">
    <div
      onClick={changeCollapsedState}
      className={
        cn('flex items-center gap-2 tracking-wider rounded-lg cursor-pointer select-none outline-none',
          {
            ['bg-nord4 text-nord2']: isFocused,
            ['hover:bg-focusedClr hover:text-nord4' ]: !isFocused
          },
          'transition-colors'
        )
      }
    >
      {
        (icon && !error) ? <img src={icon}
          onError={setError.bind(null, true)}
          className={'rounded-xl object-center w-[20px] h-[20px] mt-1 block border-nord15 flex-shrink-0'}
          alt={name}
        /> : <MdTab size={20}
          className="flex-shrink-0"
        />
      }
      <h3 className="text-lg m-0 overflow-ellipsis whitespace-nowrap overflow-hidden flex-grow">{name}</h3>
      <animated.div className="flex-shrink-0 text-nord15"
        style={
          {
            rotate: rotate
          }
        }
      >
        <MdClose size={20}/>
      </animated.div>
    </div>
    {
      !collapsed && <div>{children}</div>
    }
  </div>;
};

const TabGroupMemo = React.memo(TabGroup);

export default TabGroupMemo;
