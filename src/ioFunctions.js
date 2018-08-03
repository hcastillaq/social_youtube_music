import io from 'socket.io-client';
import Reproductor from './fnReproductor';


export let socket = null;
window.clearIo = function(){
  socket.emit('clear');
}
export const loadIo = () => {
  console.info('!-------- Load ioFunctions---------------!');

  socket = io('/');
  
  socket.on('dataSongs', songs => {
    Reproductor.setSogns(songs);
  });
};

