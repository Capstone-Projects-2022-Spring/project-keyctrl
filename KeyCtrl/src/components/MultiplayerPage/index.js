const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
    transports: ['websocket', 'polling']
  },
  allowEIO3: true
});

var numClients = {};

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('switchLobby', function(newRoom, username) {
    socket.leave(socket.room);
    socket.join(newRoom.lobbyID);
    socket.emit('updateLobby', newRoom);

    if(numClients[newRoom.lobbyID] == undefined) {
      numClients[newRoom.lobbyID] = 1;
    } else {
      numClients[newRoom.lobbyID]++;
    }

    socket.emit('playerJoined', username)

    if(numClients[newRoom.lobbyID] == 5) {
      socket.emit('gameStart')
    }
  });

  socket.on('disconnect', function() {
    numClients[socket.room]--;
  })

  socket.on('message', ({ name, message }, room) => {
    io.in(room).emit('message', { name, message });
  });
});

http.listen(4000, () => {
  console.log('listening on *:4000');
});