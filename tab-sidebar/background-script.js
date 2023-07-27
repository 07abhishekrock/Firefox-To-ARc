if(typeof browser !== 'undefined'){

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

	})
}
