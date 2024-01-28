import cn from 'classnames';

import CustomImage from '../CustomImage';
import Icon from '../Icon';
import { TabItemType } from './types';
import IconButton from '../IconButton';
import { useTabController } from 'helpers/tabs/controller';


const TabItem = ({
  title,
  image,
  isActive,
  isMuted,
  isAudioTab,
  id
}: TabItemType) => {

  const tabController = useTabController();

  return <div class={
    cn('tab_item', {
      selected: isActive
    })
  }
  >
    {
      image ? <CustomImage src={image}
        width={20}
        height={20}
      /> : <Icon iconName={'tab'}
        iconSize={'20px'}
      />
    }
    <span class= 'tab_item__title'>
      {title}
    </span>
    {
      (isAudioTab || isMuted) && <IconButton iconName={
        isMuted ? 'volume_off' : 'volume_up'
      }
      sizeType='regular'
      onIconClick={
        () => {
          tabController.toggleMuteForTab(id ?? -1, !isMuted);
        }
      }
      />
    }
    {
      <div class="tab_item__close">
        <IconButton iconName={'close'}
          sizeType='regular'
          onIconClick={
            () => {
              tabController.closeTab(id ?? -1);
            }
          }
        />

      </div>
    }
  </div>;
};

export default TabItem;
