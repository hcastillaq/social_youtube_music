
/**
 * Este reproductor solo funciona en el lado del servidor.
 */
module.exports = class Resproductor {

	/**
	 * 
	 * @param {Object} reproductorConfig configuracion inicial de reproductor; 
	 */
	constructor(reproductorConfig) {
		
		/**
		 * lista de canciones
		 */
		this.songs = [];

		
		/**
		 * Configuracion del reproductor
		 */
		this.reproductorConfig = this.validateConfig(reproductorConfig);
		
		/**
		 * cancion sonando.
		 */
		this.currentSong = null;
	}

	/**
	 * Valida la configuracion del reporductor;
	 * @param {*} reproductorConfig 
	 */
	validateConfig(reproductorConfig) {

		/**
		 * Opciones validas en el reproductor
		 */
		let options = ['play', 'load', 'finish'];

		/**
		 * Configucarion limpia para hacer reset en caso de error.
		 */
		let cleanConfig = {
			play: () => { },
			load: () => { },
			finish: () => { }
		}

		/**
		 * Validamos si existe una configuracion previa, en el caso que si,
		 * recorremos el contenido de dicha configuracion  y validamos que
		 * exista los necesario, de los contrario agregamos.
		 */
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

	/**
	 * Crea una funcion asincrona que cada x tiempo
	 * aumenta los segundos transcurridos hasta llegar
	 * al tiempo de la cancion. Los tiempos de las 
	 * canciones se manejan desde aqui, el cliente es el que se amolda a estos
	 * tiempos.
	 */
	play() {
		if (this.getCurrentSong() != null) {

			/**
			 * factor base del tiempo
			 */
			let seconds = 1.5;

			/**
			 * funciones asincrona que hace las operaciones
			 */
			let timmer = setInterval(() => {
				/**
				 * segundo actual de la cancion
				 */
				let currentSecond = this.getCurrentSong().currentSecond;
				/**
				 * Duracion total de la cancion en segundos
				 */
				let duration = this.getCurrentSong().duration;

				/**
				 * Nos indica si la cancion sigue en curso o ya termino
				 */
				if (currentSecond < duration) {

					/**
					 * Objeto a enviar, obitene la hora actual para
					 * calcular una latencia y el segundo actual de la cancion.
					 */
					let data = {
						sendTime: (new Date).getTime(),
						song: this.getCurrentSong()
					}

					this.reproductorConfig.play(data);

					/**
					 * Actualizamos los segundos actuales de la cancion.
					 */
					let song = this.getCurrentSong();
					song.currentSecond += seconds;
					this.setCurrentSong(song);
				}
				else {
					/**
					 * Limpia La funcion.
					 */
					clearInterval(timmer);

					/**
					 * Selecciona la cancion que sigue.
					 */
					this.finishSong();
					console.log('next song please !!');
				}
			}, seconds * 1000);
		}
	}

	/**
	 * Retorna la lista de canciones del reproductor
	 */
	getSongs() {
		return this.songs;
	}

	/**
	 * Retorna la cancion en curso
	 */
	getCurrentSong() {
		return this.currentSong;
	}

	/**
	 * Agrega la cancion actual
	 * @param {Object} song 
	 */
	setCurrentSong(song) {
		this.currentSong = song;
	}

	/**
	 * Obtienel a cancion siguiente y la carga.
	 */
	nextSong() {
		let song = this.getSongs()[0];
		if (song) {
			this.load(this.getSongs()[0]);
		}
	}

	/**
	 * Remueve la cancion actual de las lista de canciones 
	 * y pasa a la siguiente cancion.
	 */
	finishSong() {
		this.removeSong(this.getCurrentSong());
		this.setCurrentSong(null);
		this.reproductorConfig.finish(this.getSongs());
		this.nextSong();
	}

	/**
	 * Elimina una cancion de la lista de canciones.
	 * @param {Object} song
	 */
	removeSong(song) {
		let items = [];
		this.songs = this.songs.filter($song => $song.video_id != song.video_id);
	}
}
