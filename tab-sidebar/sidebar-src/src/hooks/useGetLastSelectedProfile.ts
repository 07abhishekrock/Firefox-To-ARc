import {useEffect, useState} from "react"
import {MessageWrapper} from "../utils/messages";

export const LAST_SELECTED_PROFILE_KEY = 'last-selected-profile';

export type Profile = browser.contextualIdentities.ContextualIdentity

type ProfileChangeMessage = MessageWrapper<{ newProfile: Profile }>
const PROFILE_CHANGE_MESSAGE_KEY = 'profile-changed'

export const useGetLastSelectedProfile = ()=>{
	const [lastSelectedProfile, setLastSelectedProfile] = useState<Profile | null | undefined>(null);

	const getLastSelectedProfileAndSetInState = async ()=>{

		if(typeof browser === 'undefined') return;

		const profile = await browser.storage.local.get(LAST_SELECTED_PROFILE_KEY);
		if(profile[LAST_SELECTED_PROFILE_KEY]) {
			setLastSelectedProfile(profile[LAST_SELECTED_PROFILE_KEY]);
		}
		else{
			setLastSelectedProfile(undefined);
		}
	}

	const changeLastSelectedProfile = async (newProfile: Profile)=>{
		if(typeof browser === 'undefined') return;

		if(newProfile){
			await browser.storage.local.set({
				[LAST_SELECTED_PROFILE_KEY]: newProfile
			})
			setLastSelectedProfile(newProfile);
		}
	}

	useEffect(()=>{
		getLastSelectedProfileAndSetInState();
		if(typeof browser !== 'undefined') {

			const cb = (msg: ProfileChangeMessage)=>{
				if(msg.type === PROFILE_CHANGE_MESSAGE_KEY){
					setLastSelectedProfile(msg.data.newProfile);
				}		
			}

			browser.runtime.onMessage.addListener(cb);

			return ()=>browser.runtime.onMessage.removeListener(cb);

		}
	}, [])

	return [lastSelectedProfile, changeLastSelectedProfile] as [Profile, (newValue: Profile | null | undefined)=>void];

}
