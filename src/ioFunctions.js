console.info('!-------- Load ioFunctions---------------!');

import io from 'socket.io-client';
import Reproductor from './fnReproductor';


export const socket = io('/');

socket.on('dataSongs', songs => {
  Reproductor.setSogns(songs);
});

