const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('switchLobby', function(newRoom) {
    socket.leave(socket.room);
    socket.join(newRoom);
    socket.emit('updateLobby', newRoom);
  });

  socket.on('message', ({ name, message }, room) => {
    io.in(room).emit('message', { name, message });
  });
});

server.listen(4000, () => {
  console.log('listening on *:3001');
});