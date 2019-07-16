import {loadIo} from './../IO/ioFunctions';

let instance = null;
class Reproductor {

	constructor()
	{
		if(instance == null)
		{
			instance = this;
			
			this.on = false;
			this.player = null; 
			this.playerTest = null;
			this.testResolve = () => {};
		}
		return instance;
	}


	load(song){
		this.player.loadVideoById(song.video_id);
		this.player.stopVideo();
	}

	play(data)
	{
		this.player.playVideo();

		let second = data.song.currentSecond;
		second -= (data.latencia * 0.001); 

		let playerSecond = this.player.getCurrentTime();

		/* Calculamos diferencia */
		let dif = Math.abs(playerSecond - second);

		if(dif >= 2){
			this.player.seekTo(second);
		}
	}

	onReady(event){
		this.player = event.target;
		loadIo();
	}

	onReadyTest(event){
		this.playerTest = event.target;
	}

	onStatusChangeTest(event){
		console.log(event.target.getDuration())
		if(event.data == 1){
			let data = event.target.getVideoData();
			data.duration = event.target.getDuration();
			data.currentSecond = 0;
			event.target.pauseVideo()
			this.testResolve(data);
			this.testResolve = () => {};
		}
	}
	
	getDataVideo(videoId)
	{
		this.playerTest.loadVideoById(videoId);
		this.playerTest.mute();
		return new Promise( (resolve, reject) => {
			this.testResolve = resolve;
		});
	}

	getPlayer(){
		return this.player;
	}
}

export default new Reproductor();
