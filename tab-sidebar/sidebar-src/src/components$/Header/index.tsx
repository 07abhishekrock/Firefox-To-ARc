import Icon from '../Icon';
import HeaderButton from '../HeaderButton';
import { useCurrentTab } from './currentTabsType.state';
import { useCurrentProfile } from '../TabListContainer/tabList.state';


const Header = () => {

  const [ currentTabState ] = useCurrentTab();
  const [ profile ] = useCurrentProfile();


  const currentTabText = () => {
    switch (currentTabState()) {
      case 'media': return 'Your Media Tabs';

      default : return 'Your Tabs';
    }
  };

  return (
    <div class="header">
      <span class="headerTitle">
        <Icon sizeType='small'
          iconName="tabs"
        />

        {currentTabText()}
      </span>
      <div class="headerSettingSection">
        {
          (typeof profile() !== 'undefined') && <HeaderButton>
            <div class="circle"
              style={
                {
                  background: profile().color
                }
              }
            ></div>
            <span>{profile().name}</span>
          </HeaderButton>
        }
        <HeaderButton>
          <Icon sizeType='regular'
            iconName="settings"
          />
        </HeaderButton>
        <HeaderButton>
          <Icon sizeType='regular'
            iconName="close"
          />
        </HeaderButton>
      </div>
    </div>
  );
};

export default Header;
