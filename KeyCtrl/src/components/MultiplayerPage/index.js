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

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('switchLobby', function(newRoom) {
    socket.leave(socket.room);
    socket.join(newRoom.lobbyID);
    socket.emit('updateLobby', newRoom);
  });

  socket.on('message', ({ name, message }, room) => {
    console.log("in message")
    io.in(room).emit('message', { name, message });
  });
});

http.listen(4000, () => {
  console.log('listening on *:4000');
});