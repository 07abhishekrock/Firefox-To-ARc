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
	const videoElement = document.querySelector('video')
	const titleElement = document.querySelector('.content-info-wrapper > yt-formatted-string')

	const playCallback = ()=>{
		browser.runtime.sendMessage({
			id: 'YOUTUBE_MUSIC::RECEIVE_LATEST_PLAYBACK',
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
	const titleElement = document.querySelector('.content-info-wrapper > yt-formatted-string')
	const previousElement = document.querySelector('.previous-button')
	const nextElement = document.querySelector('.next-button')

	if(isValidMessage(msg)){
		const id = msg.id
		switch(id){
			case 'YOUTUBE_MUSIC::GET_LATEST_PLAYBACK': {
				browser.runtime.sendMessage({
					id: 'YOUTUBE_MUSIC::RECEIVE_LATEST_PLAYBACK',
					paused: videoElement.paused,
					title: titleElement.title
				})
				break
			}
			case 'YOUTUBE_MUSIC::TOGGLE_PLAY': {
				if(videoElement.paused) {
					videoElement.play()
					
				}
				else {
					videoElement.pause()
				}
				break
			}
			case 'YOUTUBE_MUSIC::PLAY_PREVIOUS': {
				previousElement.click()
				break
			}
			case 'YOUTUBE_MUSIC::PLAY_NEXT': {
				nextElement.click()
				break
			}
		}
	}

})

