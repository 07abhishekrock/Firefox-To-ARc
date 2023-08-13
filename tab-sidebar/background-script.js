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


if(typeof browser !== 'undefined'){

	const PROFILE_KEY = 'default-profile-key';

	let previousTabId = null;

	browser.tabs.onActivated.addListener(e=>{
		if(e.previousTabId){
			previousTabId = (e.previousTabId);
		}
	})

	browser.commands.onCommand.addListener((command)=>{

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

		if(command === 'create-new-tab-container'){
			browser.storage.local
				.get(PROFILE_KEY)
				.then((value)=>{
					const data = safeJsonParse(value[PROFILE_KEY])
					if(data){
						if(data?.state?.lastSelectedProfileKey){
							// last selected profile exists
							browser.tabs.create({
								url: 'https://google.in',
								cookieStoreId: data.state.lastSelectedProfileKey.cookieStoreId
							})
						}
					}
					else{
						browser.tabs.create({
							url: 'https://google.in'
						})
					}
				}
			);
		}

	})
}
