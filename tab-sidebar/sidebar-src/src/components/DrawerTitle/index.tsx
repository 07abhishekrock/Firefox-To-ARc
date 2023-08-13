import * as React from 'react';
import { useSpringValue, animated } from '@react-spring/web';
import { FaHome } from 'react-icons/fa';
import { useScreenController } from '../../store/useScreenController';


const DrawerTitle = ({ drawerTitle }: {drawerTitle?: string}) => {

  const barWidth = useSpringValue('0%');
  const pillPos = useSpringValue(100);
  const pillOpacity = useSpringValue(0);
  const { changeScreenTo } = useScreenController();

  React.useEffect(() => {
    barWidth.start('100%').then(() => {
      pillOpacity.start(1);
      pillPos.start(10);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>
    <h2 className="text-2xl font-semibold tracking-wider flex gap-2">
      <span className="flex-grow">{drawerTitle ?? 'Your TABS'}</span>
      <FaHome size="20"
        className="cursor-pointer"
        onClick={() => changeScreenTo('tab-navigation')}
      />
    </h2>
    <animated.div className="mt-3 h-0.5 w-[100%] bg-nord4 rounded-sm relative"
      style={
        {
          width: barWidth
        }
      }
    >
      <animated.div className="w-12 bg-nord4 h-2 absolute top-[50%] translate-y-[-50%] rounded-sm"
        style={
          {
            opacity: pillOpacity,
            left: pillPos
          }
        }
      >
      </animated.div>
    </animated.div>
  </div>;
};

export default DrawerTitle;
