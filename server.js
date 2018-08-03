const Hapi = require('hapi');
const Path = require('path');

const server = Hapi.server({
  port: process.env.PORT || 3000,
  host:'0.0.0.0',
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

let songs = [];

io.on('connection', socket => {

  socket.emit('dataSongs', songs);

  socket.on('addSong', (data) => {
    songs.push(data);
    io.sockets.emit('dataSongs', songs);
  });

  socket.on('deleteSong', song => {
    songs = songs.filter( s => s.video_id != song.video_id);
    io.sockets.emit('dataSongs', songs);
  });

  socket.on('clear', e => {
    songs = [];
    io.sockets.emit('dataSongs', songs);
  });
});







