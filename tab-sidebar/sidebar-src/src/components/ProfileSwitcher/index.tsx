import { animated } from '@react-spring/web';
import React, { useEffect, useCallback } from 'react';
import { useCurrentWindow } from '../../hooks/useCurrentWindow';
import { useDefaultAndSelectedProfile } from '../../hooks/useDefaultAndSelectedProfile';
import { Profile, useGetProfiles } from '../../hooks/useGetProfiles';


const ProfileSwitcherContent = ({ profiles }: { profiles: Profile[] }) => {
  const { lastSelectedProfileKey: selectedProfile, defaultProfile, changeLastSelectedProfile } = useDefaultAndSelectedProfile();

  useCurrentWindow(
    useCallback((currentWindow, closedWindowId) => {
      if (closedWindowId === currentWindow) {
        changeLastSelectedProfile(undefined);
      }
    }, [])
  );


  useEffect(() => {
    if (!selectedProfile) {
      if (defaultProfile) {
        changeLastSelectedProfile(defaultProfile);
      }

    } else {
      changeLastSelectedProfile(selectedProfile);
    }

    if (typeof browser !== 'undefined') {
      const onSwitchCommands = (command: string) => {

        const currentIndex = profiles.findIndex(s => s.id === selectedProfile?.name);

        if (command === 'switch-profile-right') {
          changeLastSelectedProfile(profiles[(currentIndex + 1) % profiles.length]);

        } else if (command === 'switch-profile-left') {
          if (currentIndex === 0) {
            changeLastSelectedProfile(profiles[profiles.length - 1]);

          } else {
            changeLastSelectedProfile(profiles[currentIndex - 1]);
          }
        }
      };

      browser.commands.onCommand.addListener(onSwitchCommands);

      return () => {
        browser.commands.onCommand.removeListener(onSwitchCommands);
      };

    }

  }, [ selectedProfile, profiles, defaultProfile ]);

  return <div className="bg-nord1 pt-2">
    <div className="relative bg-nord1 overflow-hidden">
      {
        profiles.map((profile) => {

          const isProfileSelected = selectedProfile?.name === profile.id;

          return <animated.div key={profile.name}
            className='items-center w-[80px] text-[12px] gap-1 pr-[5px] inline-flex transition-all'
          >
            <span className='grow block text-center p-1 rounded-lg bg-nord3 transition-all cursor-pointer'
              onClick={
                () => {
                  changeLastSelectedProfile(profile);
                }
              }
              style={
                {
                  background: isProfileSelected ? '#bf616a' : ''
                }
              }
            >{profile.name}</span>
          </animated.div>;
        })
      }

    </div>
  </div>;
};


const ProfileSwitcher = () => {
  const { profiles } = useGetProfiles();

  return <ProfileSwitcherContent key={profiles.map(s => s.name).join('-')}
    profiles={profiles}
  />;

};

export default ProfileSwitcher;
