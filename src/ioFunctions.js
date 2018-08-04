import io from 'socket.io-client';
import Reproductor from './fnReproductor';
import events from './events';

const CHANNELS = require('./channels');

export let socket = null;

window.clearIo = function(){
  socket.emit('clear');
}

export const loadIo = () => {
  console.info('!-------- Load ioFunctions---------------!');

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

