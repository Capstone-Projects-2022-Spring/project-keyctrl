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
var wordsArray = {};

//Generate lines to send to players
var randWordsFunc = require('random-words'); 

function chopLineToLength(wordString) {
    var trimmedString = wordString.substring(0, 60)

    // If we do not chop perfectly at end of word
    if (wordString[60] !== " ") {
        var lastIndex = trimmedString.lastIndexOf(" ")
        trimmedString = trimmedString.substring(0, lastIndex)
    }
    return trimmedString
}

function getNewWordsLine() {
    return chopLineToLength(randWordsFunc({ exactly: 20, join: ' ' }));
}

//Server-side networking code
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

    if(numClients[newRoom.lobbyID] == 2) {
      io.in(newRoom.lobbyID).emit('gameStart')
      for(var i=0; i<10; i++) {
        wordsArray[i] = getNewWordsLine()
      }
      io.in(newRoom.lobbyID).emit('gameLines', (wordsArray))
    }
  });

  socket.on('sendPlayerIndex', function(playerName, playerIndex, room) {
    io.in(room).emit('playerIndexUpdate', (playerName, playerIndex))
  })

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