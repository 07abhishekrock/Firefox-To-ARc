import { animated } from '@react-spring/web';
import React, {
  SetStateAction,
  Dispatch,
  useEffect,
  useCallback
} from 'react';
import { useCurrentWindow } from '../../hooks/useCurrentWindow';
import { useDefaultAndSelectedProfile } from '../../hooks/useDefaultAndSelectedProfile';
import { useFunkySwitchAnimate } from '../../hooks/useFunkySwitchAnimate';
import { Profile, useGetProfiles } from '../../hooks/useGetProfiles';


const ProfileSwitcherContent = ({ profiles, setProfiles }: { profiles: Profile[]; setProfiles: Dispatch<SetStateAction<Profile[]>> }) => {
  const { lastSelectedProfileKey: selectedProfile, defaultProfile, changeLastSelectedProfile } = useDefaultAndSelectedProfile();
  const {
    onItemClick,
    exitAnimateIndex,
    entryValue,
    exitSpring,
    entrySpring,
    fillSpring,
    isFillAnimating
  } = useFunkySwitchAnimate({
    items: profiles,
    setItems: setProfiles,
    itemWidth: 80,
    onAnimationComplete: (newProfile) => {
      changeLastSelectedProfile(newProfile);
    }
  });

  const commonClassName = 'items-center w-[80px] text-[12px] gap-1 pr-[5px] inline-flex';
  const spanClassName = 'grow block text-center p-1 rounded-lg bg-nord3';
  const spanClassNameSelected = spanClassName + ' bg-red';

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
        const indexOfProfile = profiles.findIndex(s => s.name === defaultProfile.name);

        setProfiles(old => {
          return [
            { ...defaultProfile, id: defaultProfile.name },
            ...old.slice(0, indexOfProfile),
            ...old.slice(indexOfProfile + 1)
          ];
        });

        changeLastSelectedProfile(defaultProfile);
      }

    } else {
      const indexOfProfile = profiles.findIndex(s => s.name === selectedProfile.name);

      setProfiles(old => {
        return [
          { ...selectedProfile, id: selectedProfile.name },
          ...old.slice(0, indexOfProfile),
          ...old.slice(indexOfProfile + 1)
        ];
      });

      changeLastSelectedProfile(selectedProfile);
    }

  }, []);

  return <div className="bg-nord1 pt-2">
    <div className="relative bg-nord1 overflow-hidden">
      {
        profiles.map((profile, index) => {

          const isProfileSelected = selectedProfile?.name === profile.id;

          if (index === exitAnimateIndex) {
            return <animated.div className={commonClassName}
              key={profile.id}
              style={exitSpring}
            >
              <span className={spanClassName}>{profile.name}</span>
            </animated.div>;
          }

          if (exitAnimateIndex && index < exitAnimateIndex && isFillAnimating) {
            return <animated.div className={commonClassName}
              style={fillSpring}
              key={profile.id}
            >
              <span className={spanClassName}>{profile.name}</span>
            </animated.div>;
          }


          return <animated.div key={profile.name}
            className={commonClassName}
            onClick={
              () => {
                onItemClick(profile.id);
              }
            }
          >
            <span className={isProfileSelected ? spanClassNameSelected : spanClassName}
              style={
                {
                  background: isProfileSelected ? '#bf616a' : ''
                }
              }
            >{profile.name}</span>
          </animated.div>;
        })
      }

      {
        entryValue && <animated.div className={commonClassName.concat(' absolute left-0 top-0 inline-block')}
          style={entrySpring}
        >
          <span className={spanClassName}>{entryValue.name}</span>
        </animated.div>
      }
    </div>
  </div>;
};


const ProfileSwitcher = () => {
  const { profiles, setProfiles } = useGetProfiles();

  return <ProfileSwitcherContent key={profiles.map(s => s.name).join('-')}
    profiles={profiles}
    setProfiles={setProfiles}
  />;

};

export default ProfileSwitcher;
