export interface ProfileItem{
  id: string;
  name: string;
  color: string;
}

export interface ProfileController {
  listAllProfiles: ()=>Promise<ProfileItem[]>;
  setProfile: (newProfile: ProfileItem)=>void;
  getCurrentProfile: ()=>ProfileItem;
  subscribeToProfileChange: (cb: (newProfile: ProfileItem)=>void)=>void;
}

export const allTabsProfile: ProfileItem = {
  name: 'All',
  color: '#FFF',
  id: '$$$$'
} as const;
