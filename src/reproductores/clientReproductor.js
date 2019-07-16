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

		let playerSecond = this.player.getCurrentTime();
		let severSecond = data.song.currentSecond;

		/* Calculamos la diferencia  de tiempos */
		let latencia = Math.abs((new Date).getTime() - data.sendTime) * 0.001 // en ms; 

		/* Diferencia real de los segundos, cliente vs servidor*/
		let dif = Math.abs( playerSecond - (severSecond + latencia) );
	
		/* si la diferencia es mayor a 1s, regresamos la cancion 
		al valor del servidor */
		if(dif > 1){
			this.player.seekTo(data.song.currentSecond);
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
