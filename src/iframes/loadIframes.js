import Reproductor from './../reproductores/clientReproductor';

/**
 * Funcion que se ejecuta cuando se carga la api-iframe de youtube.
 */
window.onYouTubeIframeAPIReady = () => {

	console.info('!-------------YOUTUBE FULL LOAD-----------!');

	/**
	 * Player ligado al iframe 1.
	 */
	new YT.Player('player', {
		videoId: '',
		playerVars: {
			'controls': 1,
			'disablekb': 1,
		},
		events: {
			'onReady': (event) => { Reproductor.onReady(event) },
			'onStateChange': (event) => function () { }
		}
	});

	/**
	 * Player ligador al reporductor de prueba, este nos facilita obtener
	 * los datos del video, como duracion y titulos, siempre se mantiene oculto,
	 * esto debido que no encontre una forma de obtener los datos sin iniciar 
	 * la cancion.
	 */
	new YT.Player('testPlayer', {
		videoId: '',
		events: {
			'onReady': (event) => { Reproductor.onReadyTest(event) },
			'onStateChange': (event) => { Reproductor.onStatusChangeTest(event) }
		}
	});
}