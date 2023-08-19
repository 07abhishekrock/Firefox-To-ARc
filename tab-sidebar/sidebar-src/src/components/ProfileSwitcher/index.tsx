import { animated } from '@react-spring/web';
import React, { useEffect } from 'react';
import {useGetLastSelectedProfile} from '../../hooks/useGetLastSelectedProfile';
import { Profile, useGetProfiles } from '../../hooks/useGetProfiles';
import {useScreenController} from '../../store/useScreenController';


const ProfileSwitcherContent = ({ profiles }: { profiles: Profile[] }) => {
  const [ selectedProfile, changeLastSelectedProfile ] = useGetLastSelectedProfile();
	const { changeScreenTo } = useScreenController();

  useEffect(() => {
    if (typeof selectedProfile === 'undefined') {
			// no profile was set ever
			changeScreenTo('change-default-profile');		
    } 

  }, [ selectedProfile, changeScreenTo ]);

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
