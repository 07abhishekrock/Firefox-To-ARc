import React from 'react';
import DrawerTitle from '../../components/DrawerTitle';
import ProfileSwitcher from '../../components/ProfileSwitcher';
import SearchResults from '../../components/SearchResults';


const TabNavigation = () => {

  return <>
    <DrawerTitle drawerTitle="Your TABS" hideHomeIcon/>
    <SearchResults/>
    <ProfileSwitcher/>
  </>;
};

export default TabNavigation;
