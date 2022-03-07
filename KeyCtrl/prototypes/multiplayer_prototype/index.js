const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('switchLobby', function(newRoom) {
    socket.leave(socket.room);
    socket.join(newRoom);
    socket.emit('updateLobby', newRoom);
  });

  socket.on('sendWPM', (msg, room) => {
    io.in(room).emit('sendWPM', msg);
  });
});

server.listen(4000, () => {
  console.log('listening on *:3001');
});
