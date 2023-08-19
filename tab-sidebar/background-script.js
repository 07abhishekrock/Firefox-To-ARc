const safeJsonParse = (value)=>{
	try{
		const data = JSON.parse(value);
		return data;
	}
	catch(e){
		console.error(e);
		return null;
	}
}


const LAST_SELECTED_PROFILE_KEY = 'last-selected-profile';

const withCachePromise = (cb)=>{
	let data = undefined;
	return () => new Promise(async (res)=>{
		if(!data) {
				const dataObtained = await cb();
				data = dataObtained;
				res(data);
			}
			else{
				res(data);
			}
	})
}

const getAllProfiles = withCachePromise(async ()=>{
	if(typeof browser !== 'undefined') {
		return await browser.contextualIdentities.query({})
	}
	return [];
})

const getCurrentSelectedProfile = async ()=>{
	if(typeof browser !== 'undefined') {
		const dataFromStorage = await browser.storage.local.get(LAST_SELECTED_PROFILE_KEY);
		return dataFromStorage[LAST_SELECTED_PROFILE_KEY];
	}
	return null;
}

const setNewLastSelectedProfile = async (valueToSet = "")=>{
	try{
		if(typeof browser !== 'undefined' && valueToSet) {
			await browser.storage.local.set({
				[LAST_SELECTED_PROFILE_KEY]: valueToSet
			})
			await browser.runtime.sendMessage({
				type: 'profile-changed',
				data: {
					newProfile: valueToSet
				}
			})
			// await browser.notifications.create({
			// 	type: 'basic',
			// 	title: "Profile Changed",
			// 	message: `Switched to Profile ${valueToSet.name}`
			// })
		}
	}
	catch(e){
		console.error(e);
	}
}


if(typeof browser !== 'undefined'){


	let previousTabId = null;

	browser.tabs.onActivated.addListener(e=>{
		if(e.previousTabId){
			previousTabId = (e.previousTabId);
		}
	})

	browser.commands.onCommand.addListener(async (command)=>{

		if(command === 'toggle-last-tab'){
			// go back
			previousTabId && browser.tabs.update(previousTabId, {active: true});
		}

		if(command === 'close-tab'){
			browser.tabs.query({active: true}).then((tabs)=>{
				const currentTab = tabs[0];
				currentTab && currentTab.id && browser.tabs.remove([currentTab.id]);
			})
		}

		if (command === 'switch-profile-right') {

			const allProfiles = await getAllProfiles();
			const lastSelectedProfile = await getCurrentSelectedProfile();

			const selectedIndex = allProfiles.findIndex(s=>s.name === lastSelectedProfile.name);
			setNewLastSelectedProfile(allProfiles[(selectedIndex + 1) % allProfiles.length]);

		} 

		if (command === 'switch-profile-left') {

			const allProfiles = await getAllProfiles();
			const lastSelectedProfile = await getCurrentSelectedProfile();

			const selectedIndex = allProfiles.findIndex(s=>s.name === lastSelectedProfile.name);

			if (selectedIndex === 0) {
				setNewLastSelectedProfile(allProfiles[allProfiles.length - 1]);

			} else {
				setNewLastSelectedProfile(allProfiles[selectedIndex - 1]);
			}
		}

		if(command === 'create-new-tab-container'){
			browser.storage.local
				.get(LAST_SELECTED_PROFILE_KEY)
				.then((value)=>{
					const data = value[LAST_SELECTED_PROFILE_KEY]
					if(data){
						// last selected profile exists
						browser.tabs.create({
							cookieStoreId: data.cookieStoreId
						})
					}
					else{
						browser.tabs.create({})
					}
				}
			);
		}

	})
}
