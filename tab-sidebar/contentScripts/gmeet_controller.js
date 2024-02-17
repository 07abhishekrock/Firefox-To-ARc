let listener = null

const isValidMessage = (msgBody)=>{

	if(!msgBody || typeof msgBody === 'undefined'){
		return false
	}

	if('id' in msgBody) {
		const id = msgBody.id
		return typeof id  === 'string' 
	}	
}



setInterval(()=>{
	const muteElement = document.querySelector('[aria-label~="microphone"]')

	const muteCallback = ()=>{
		const isMuted = !(muteElement && muteElement.getAttribute('data-is-muted') === "false")
		browser.runtime.sendMessage({
			id: 'GMEET:RECEIVE_LATEST_MUTE_STATUS',
			muted: isMuted,
			title: muteElement ? document.title : "No Current Meeting"
		})
	}

	if(muteElement){
		muteElement.addEventListener('click', muteCallback)
	}
	
}, 1000)

setInterval(()=>{
const muteElement = document.querySelector('[aria-label~="microphone"]')

	const muteCallback = ()=>{
		const isMuted = !(muteElement && muteElement.getAttribute('data-is-muted') === "false")
		browser.runtime.sendMessage({
			id: 'GMEET:RECEIVE_LATEST_MUTE_STATUS',
			muted: isMuted,
			title: muteElement ? document.title : "No Current Meeting"
		})
	}

	muteCallback();
}, 2000)

browser.runtime.onMessage.addListener((msg)=>{


	const muteElement = document.querySelector('[aria-label~="microphone"]')
	const isMuted = !(muteElement && muteElement.getAttribute('data-is-muted') === "false")

	if(isValidMessage(msg)){
		const id = msg.id
		switch(id){
			case 'GMEET:GET_LATEST_MUTE_STATUS': {
				browser.runtime.sendMessage({
					id: 'GMEET::RECEIVE_LATEST_MUTE_STATUS',
					muted: isMuted,
					title: muteElement ? document.title : "No Current Meeting"
				})
				break
			}
			case 'GMEET:TOGGLE_MUTE_STATUS': {
				muteElement && muteElement.click()
				break
			}
			
		}
	}

})

