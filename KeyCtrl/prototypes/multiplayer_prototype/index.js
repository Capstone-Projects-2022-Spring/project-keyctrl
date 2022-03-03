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

  socket.on('switchRoom', function(newRoom) {
    socket.leave(socket.room);
    socket.join(newRoom);
    socket.emit('updateRooms', newRoom);
  });

  socket.on('sendWPM', (msg, room) => {
    io.in(room).emit('sendWPM', msg);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
