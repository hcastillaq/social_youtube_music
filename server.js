const Hapi = require('hapi');
const Path = require('path');

const server = Hapi.server({
  port:3000,
  host:'localhost',
  routes:{
    files:{
      relativeTo: Path.join(__dirname, 'dist')
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

io.on('connection', socket => {
    console.log('User connected');
});







