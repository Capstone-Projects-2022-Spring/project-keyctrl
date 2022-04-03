const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:4000", "https://generated-respected-python.glitch.me", "https://keyctrl.net"],  //CHANGE TO HOST URL
    methods: ["GET", "POST"],
    credentials: true,
    transports: ['websocket', 'polling']
  },
  allowEIO3: true
});

//Initialize Ranked Queue with MMR buckets
var rankedQueue = []
rankedQueue[0] = new Array()        //0-299
rankedQueue[1] = new Array()        //300-599
rankedQueue[2] = new Array()        //600-899
rankedQueue[3] = new Array()        //900+

var bucketBracketOne = 300
var bucketBracketTwo = 600
var bucketBracketThree = 900

var foundPlayers = []       //WARNING: CURRENTLY ALL LOGIC INVOLVING FOUNDPLAYERS WILL FAIL
                            //AS IT WILL OVERLAP WITH OTHER GAMES. NEEDS TO BE MADE GAME SPECIFIC SOMEHOW

io.on('connection', (socket) => {
  console.log("connection received")
    socket.on('addToRankedQueue', function({socketID, username, mmr}) {
        console.log("ADDED TO QUEUE - socket: " + socketID + " user: " + username + " mmr: " + mmr)
        var queuingPlayer = {socketID, username, mmr}
        //Place user in their bucket
        switch(mmr) {
            case (mmr<bucketBracketOne):
                console.log("Player dropped in bucket one")
                rankedQueue[0].push(queuingPlayer)
            case (mmr<bucketBracketTwo):
                console.log("Player dropped in bucket two")
                rankedQueue[1].push(queuingPlayer)
            case (mmr<bucketBracketThree):
                console.log("Player dropped in bucket three")
                rankedQueue[2].push(queuingPlayer)
            default: 
            console.log("Player dropped in bucket four")
                rankedQueue[3].push(queuingPlayer)
        }
      })
    socket.emit('rankedGameMatched', (foundPlayers))
})

//Bucket sorting and player pairing logic goes here
while(foundPlayers.length < 4) {
    rankedQueue.forEach(player => {

    })
}

http.listen(4001, () => {
    console.log('listening on *:4001');
  }); 