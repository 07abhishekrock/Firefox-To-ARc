import React, { useEffect } from 'react';
import DrawerTitle from '../../components/DrawerTitle';
import ProfileSwitcher from '../../components/ProfileSwitcher';
import SearchResults from '../../components/SearchResults';
import { useDefaultAndSelectedProfile } from '../../hooks/useDefaultAndSelectedProfile';
import { useScreenController } from '../../store/useScreenController';


const TabNavigation = () => {

  const { defaultProfile, changeDefaultProfileConsumed, defaultProfileConsumed } = useDefaultAndSelectedProfile();
  const changeScreenTo = useScreenController(s => s.changeScreenTo);

  useEffect(() => {

    if (!defaultProfileConsumed) {
      const timeout = setTimeout(() => {
        changeDefaultProfileConsumed(true);
      }, 100);

      return () => clearTimeout(timeout);
    }

    if (!defaultProfile) {
      changeScreenTo('change-default-profile');
    }


  }, [ changeScreenTo, defaultProfile, defaultProfileConsumed, changeDefaultProfileConsumed ]);

  return <>
    <DrawerTitle drawerTitle="Your TABS"/>
    <SearchResults/>
    <ProfileSwitcher/>
  </>;
};

export default TabNavigation;
