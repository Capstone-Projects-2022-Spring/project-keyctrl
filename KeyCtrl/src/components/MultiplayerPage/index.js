const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: ["https://capstone-projects-2022-spring.github.io", "http://localhost:3000" ,"https://keyctrl.net"],  //CHANGE TO HOST URL
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
var findMatchPlayers = [];

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
  console.log(socket.id + ' connected');

  /*Find Match
  * ----------
  * Uses socket.id (unique socket ID assigned automatically by socket.io) to track users waiting 
  * for a match. Once the match is made, the users are sent to MultiplayerGame.js. When the user presses
  * Find Match, a modal is displayed. Pressing cancel calls cancelFindMatch and removes the user from the queue.
  * ----------
  */
  //Add player to the queue if they aren't in it already
  socket.on('findMatch', function() {
    if(!findMatchPlayers.includes(socket.id)) {
      console.log(socket.id + " looking for match")
      findMatchPlayers.push(socket.id)
    }
    
    //If there are more than 4 people queuing, begin a game
    if(findMatchPlayers.length >= gameStartPlayers) {
      console.log('---- Match Found ----')
      console.log('---------------------')
      console.log('| Players: ')
      findMatchPlayers.forEach(player => console.log("| " + player))
      console.log('---------------------')

      //Create random lobby ID
      var lobby = 'room' + Math.random() * 10000
      //Remove the first four players from the queue and emit them the findMatchSuccess event
      for(var i=0; i<gameStartPlayers; i++) {
        var player = findMatchPlayers.shift()
        io.to(player).emit('findMatchSuccess', lobby)
        console.log(player + ' joining match')
      } 
    }
  })

  socket.on('cancelFindMatch', function() {
    findMatchPlayers.splice(findMatchPlayers.indexOf(socket.id), 1)
    console.log(socket.id + " stopped looking for a match")
  })

  //Custom Lobby code
  socket.on('switchLobby', function(newRoom, username) {
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
    socket.broadcast.to(room).emit('playerIndexUpdate', playerName, playerIndex, playerLineArrayIndex)
  })

  socket.on('disconnecting', function() {
    //Remove players from lobby/find match queue on disconnecting
    var socketInfo = Array.from(socket.rooms)
    if(numClients[socketInfo[1]] > 0) {
      numClients[socketInfo[1]]--
    }
    
    findMatchPlayers.splice(findMatchPlayers.indexOf(socket.id), 1)
  })

  socket.on('disconnect', function() {
    console.log(socket.id + " disconnected")
  })

  socket.on('gameEnd', function(player, WPM, room) {
    console.log('gameEnd')
    if(matchResultsArray[room] == null) {
      matchResultsArray[room] = new Array()
    }
    matchResultsArray[room].push({player, WPM})
    if(matchResultsArray[room].length === numClients[room]) {
      io.in(room).emit('matchResults', matchResultsArray[room])
      numClients[room] = 0

      //room reset
      matchResultsArray[room] = null
      for(var i=0; i<10; i++) {
        wordsArray[i] = getNewWordsLine()
      }
      roomWordsArray[room] = wordsArray
    }
  })

  socket.on('message', ({ name, message }, room) => {
    io.in(room).emit('message', { name, message });
  });
});

http.listen(4000, () => {
  console.log('listening on *:4000');
}); 