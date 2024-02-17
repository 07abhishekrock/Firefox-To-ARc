let listener = null
console.log('hello from content script')

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
	const videoElement = document.querySelector('video')
	const titleElement = {title: document.title} 

	const playCallback = ()=>{
		browser.runtime.sendMessage({
			id: 'YOUTUBE::RECEIVE_LATEST_PLAYBACK',
			paused: videoElement.paused,
			title: titleElement.title
		})
	}

	if(videoElement){

		videoElement.removeEventListener('play', playCallback)
		videoElement.removeEventListener('pause', playCallback)

		videoElement.addEventListener('play', playCallback)
		videoElement.addEventListener('pause', playCallback)
	}
	
}, 1000)

browser.runtime.onMessage.addListener((msg)=>{

	const videoElement = document.querySelector('video')
	const titleElement = {title: document.title}
	const nextElement = document.querySelector('.ytp-button.ytp-next-button')

	console.log({titleElement})

	if(isValidMessage(msg)){
		const id = msg.id
		switch(id){
			case 'YOUTUBE::GET_LATEST_PLAYBACK': {
				browser.runtime.sendMessage({
					id: 'YOUTUBE::RECEIVE_LATEST_PLAYBACK',
					paused: videoElement.paused,
					title: titleElement.title
				})
				break
			}
			case 'YOUTUBE::TOGGLE_PLAY': {
				if(videoElement.paused) {
					videoElement.play()
					
				}
				else {
					videoElement.pause()
				}
				break
			}
			case 'YOUTUBE::PLAY_PREVIOUS': {
				previousElement.click()
				break
			}
			case 'YOUTUBE::PLAY_NEXT': {
				nextElement.click()
				break
			}
		}
	}

})

