const Hapi = require('hapi');
const Path = require('path');

const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  routes:{
    files:{
      relativeTo: Path.join(__dirname, 'public')
    }
  }
});

server.route({
  method:'GET',
  path:'/',
  handler: (request, h) => {
    return h.file('index.html');
  }
});

const init = async() => {
  await server.register(require('inert'));
  server.route({
    method:'GET',
    path: '/static/{file*}',
    handler: (request, h) => {
      return h.file(request.params.file);
    }
  });
  await server.start();

  console.log(`Server running at: ${server.info.uri}`)
}

init();

/* -------------- Socket.io ------------------ */

const io = require('socket.io')(server.listener);
const CHANNELS = require('./src/channels');

let emits = new(require('./src/emits'))(io);

const reproductorConfig = {
  play: (data) => {
    emits.emit(CHANNELS.PLAY, data);
  },
  load: (data) => {
    emits.emit(CHANNELS.LOAD, data);
  },
  finish: (data) =>{
    emits.emit(CHANNELS.DATASONGS, data);
  }
};

const resproductor = new(require('./src/serverReproductor'))(reproductorConfig);

io.on('connection', socket => {

  emits.emit(CHANNELS.DATASONGS, resproductor.getSongs(), socket);
  
  if( resproductor.getCurrentSong() != null )
  {
    emits.emit(CHANNELS.LOAD, resproductor.getCurrentSong(), socket);
  }

  socket.on(CHANNELS.ADD_SONG, (song) => {
    resproductor.setSong(song);
    emits.emit(CHANNELS.DATASONGS, resproductor.getSongs());
  });

  
  /* Para resetear todo por si pasa algo */
  socket.on('clear', e => {
    songs = [];
    currentSong = null;
    io.sockets.emit('dataSongs', songs);
  });

});







