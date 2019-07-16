import io from 'socket.io-client';
import Reproductor from './../reproductores/clientReproductor';
import events from './../bus/events';

const CHANNELS = require('./../bus/channels');

export let socket = null;

/**
 * Funcion que nos permite dar reset al servidor,
 * util en caso de errores.
 */
window.clearIo = function(){
	socket.emit('clear');
}

export const loadIo = () => {
	console.info('!-------- LOAD SOCKET IO FUNCTIONS --------------!');

	socket = io('/');
	
	socket.on(CHANNELS.DATASONGS, songs => {
		events.getSubject('songsdata').next(songs);
	});

	socket.on(CHANNELS.LOAD, song => {
		Reproductor.load(song);
	});

	socket.on(CHANNELS.PLAY, song => {
		song.latencia = (new Date).getTime() - song.sendTime;
		Reproductor.play(song);
	});
};

