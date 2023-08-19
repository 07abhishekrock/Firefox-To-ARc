import React, { useMemo } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import DrawerTitle from '../../components/DrawerTitle';
import {useGetLastSelectedProfile} from '../../hooks/useGetLastSelectedProfile';
import { useGetProfiles } from '../../hooks/useGetProfiles';


const ProfileItem = ({ selected, name, onClick }: {selected?: boolean; name: string; onClick?: ()=>void}) => {

  if (selected) {
    return <div className="bg-nord3 pt-2 text-lg pb-2 pl-3 pr-3 rounded-md gap-2 flex items-center mb-2">
      <FaCheckCircle size="15"/>{name}
    </div>;
  }

  return <div className="bg-nord0 text-lg pt-2 pb-2 pl-3 pr-3 rounded-md gap-2 flex items-center hover:bg-nord2 cursor-pointer mb-2"
    onClick={onClick}
  >{name}</div>;
};


const DefaultProfileItem = ({ defaultProfile }: {defaultProfile?: browser.contextualIdentities.ContextualIdentity | null}) => {

  if (!defaultProfile) return <h2 className="text-lg mb-2">No Default Profile Selected</h2>;

  return <>
    <ProfileItem name={defaultProfile.name}
      selected
    />
    <p className="text-sm flex gap-2 mt-2 text-nord15">
      This is the profile which is set every time you open the browser.
    </p>
  </>;

};


const SelectDefaultProfile = () => {

  const { profiles } = useGetProfiles();

	const [ lastSelectedProfile , setLastSelectedProfile ] = useGetLastSelectedProfile();

  return <>
    <DrawerTitle drawerTitle="Profiles"/>
    <div className="mt-8"/>
    <DefaultProfileItem defaultProfile={lastSelectedProfile}/>
    <h3 className="text-lg mt-8 mb-4">Other Profiles</h3>
    {
      profiles.map((profile) => {
        return <ProfileItem key={profile.id}
          name={profile.name}
          onClick={
            () => {
							setLastSelectedProfile(profile);
            }
          }
        />;
      })
    }
  </>;
};

export default SelectDefaultProfile;
