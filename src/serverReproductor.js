module.exports = class Resproductor {
	constructor(reproductorConfig) {
		this.songs = [];
		this.reproductorConfig = this.validateConfig(reproductorConfig);
		this.currentSong = null;
	}

	validateConfig(reproductorConfig) {

		let options = ['play', 'load', 'finish'];

		let cleanConfig = {
			play: () => { },
			load: () => { },
			finish: () => { }
		}

		if (reproductorConfig != undefined) {

			options.forEach(key => {
				reproductorConfig[key] = reproductorConfig[key] ?
					reproductorConfig[key] : cleanConfig[key];
			});
			return reproductorConfig;
		}

		return cleanConfig;
	}

	load(song) {
		this.setCurrentSong(song);
		this.reproductorConfig.load(this.getCurrentSong());
		this.play();
	}

	setSong(song) {
		this.songs.push(song);
		if (this.getCurrentSong() == null) {
			this.load(song);
		};
	}

	play() {
		if (this.getCurrentSong() != null) {

			let seconds = 1;
			let timmer = setInterval(() => {
				let currentSecond = this.getCurrentSong().currentSecond;
				let duration = this.getCurrentSong().duration;
				if (currentSecond < duration) {

					let data = {
						sendTime: (new Date).getTime(),
						song: this.getCurrentSong()
					}

					this.reproductorConfig.play(data);

					let song = this.getCurrentSong();
					song.currentSecond += seconds;
					this.setCurrentSong(song);

				}
				else {
					clearInterval(timmer);
					this.finishSong();
					console.log('next song please !!');
				}
			}, seconds * 1000);
		}
	}

	getSongs() {
		return this.songs;
	}

	getCurrentSong() {
		return this.currentSong;
	}

	setCurrentSong(song) {
		this.currentSong = song;
	}

	nextSong() {
		let song = this.getSongs()[0];
		if (song) {
			this.load(this.getSongs()[0]);
		}
	}

	finishSong() {
		this.removeVideo(this.getCurrentSong());
		this.setCurrentSong(null);
		this.reproductorConfig.finish(this.getSongs());
		this.nextSong();
	}

	removeVideo(s) {
		let items = [];
		this.songs = this.songs.filter(song => song.video_id != s.video_id);
	}
}
