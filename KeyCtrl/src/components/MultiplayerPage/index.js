const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",  //CHANGE TO HOST URL
    methods: ["GET", "POST"],
    credentials: true,
    transports: ['websocket', 'polling']
  },
  allowEIO3: true
});

var numClients = {};
var wordsArray = {};
var roomWordsArray = {};
var matchResultsArray = {};

var gameStartPlayers = 4;

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

  //On lobby join
  socket.on('switchLobby', function(newRoom, username) {

    socket.leave(socket.room);
    socket.join(newRoom.lobbyID);
    socket.emit('updateLobby', newRoom);

    //Generate words list for this room
    if(roomWordsArray[newRoom.lobbyID] == null) {
      for(var i=0; i<10; i++) {
        wordsArray[i] = getNewWordsLine()
      }
      roomWordsArray[newRoom.lobbyID] = wordsArray
    }
    socket.emit('gameLines', (roomWordsArray[newRoom.lobbyID]))
    
    //Count the room's clients
    if(numClients[newRoom.lobbyID] == undefined) {
      numClients[newRoom.lobbyID] = 1;
    } else {
      numClients[newRoom.lobbyID]++;
    }


    io.in(newRoom.lobbyID).emit('pollAllPlayers')
    socket.on('sendInLobby', (username) => {
      socket.broadcast.to(newRoom.lobbyID).emit('playerJoined', username)
    })

    if(numClients[newRoom.lobbyID] == gameStartPlayers) {

      io.in(newRoom.lobbyID).emit('gameStart')
    }
  });

  socket.on('sendPlayerIndex', function(playerName, playerIndex, playerLineArrayIndex, room) {
    console.log(playerName, playerIndex, playerLineArrayIndex, room)
    socket.broadcast.to(room).emit('playerIndexUpdate', playerName, playerIndex, playerLineArrayIndex)
  })

  socket.on('disconnecting', function() {
    var socketInfo = Array.from(socket.rooms)
    numClients[socketInfo[1]]--

  })

  socket.on('disconnect', function() {
    console.log("client disconnect")
  })

  socket.on('gameEnd', function(player, WPM, room) {
    console.log('gameEnd')
    if(matchResultsArray[room] == null) {
      matchResultsArray[room] = new Array()
    }
    matchResultsArray[room].push({player, WPM})
    if(matchResultsArray[room].length === numClients[room]) {
      io.in(room).emit('matchResults', matchResultsArray[room])
    }
  })

  socket.on('message', ({ name, message }, room) => {
    io.in(room).emit('message', { name, message });
  });
});

http.listen(4000, () => {
  console.log('listening on *:4000');
});