import { useState, useRef, useEffect, useInterval } from 'react'
import io from "socket.io-client"
import '../../styles/TypingTest.css'
import { PropTypes } from 'prop-types'
import OpponentTestVisual from './OpponentTestVisual';
import styled from 'styled-components'
import Popup from 'reactjs-popup'

const MultiplayerGame = (props) => {
  const [lobbyPlayers, setLobbyPlayers] = useState(new Map())

  const [staticCountdown, setStaticCountdown] = useState(15);
  const [countdown, setCountdown] = useState(3);
  const [choppedCurrentLine, setChoppedCurrentLine] = useState("");    //setting its use state
  const [lineIndex, setLineIndex] = useState(0)
  const [index, setIndex] = useState(0);
  const [timer, setTimer] = useState(45);
  const [timerActive, setTimerActive] = useState(false);
  const [inCountdown, setInCountdown] = useState(false)
  const [currentLineLength, setCurrentLineLength] = useState(0);
  const [numEntries, setNumEntries] = useState(0);
  const [WPMTime, setWPMTime] = useState(1);

  const [randomWords, setCurrentRandomWords] = useState(" ");    //setting its use state
  const [nextUpRandomWords, setNextUpRandomWords] = useState(" ");

  const [lineArrayIndex, setLineArrayIndex] = useState(0)
  const [lineArray, setLineArray] = useState([])

  const [leaderBoardOpen, setLeaderBoardOpen] = useState(false);
  const [leaderboard, setLeaderboard] = useState([{ player: '', WPM: '' }, { player: '', WPM: '' }, { player: '', WPM: '' }, { player: '', WPM: '' }]);
  const closeLeaderBoard = () => setLeaderBoardOpen(false);


  // ---- Server Communication -------------------------------------
  const [state, setState] = useState({ message: "", name: "" })
  const [chat, setChat] = useState([])

  const socketRef = useRef()

  var lobbyID = props.lobbyID
  var username = props.username
  var la;

  useEffect(() => {
  }, [])

  useEffect(
    () => {

      socketRef.current = io.connect("http://lbox.ddns.net:4000") //LOCALHOST for local testing
      console.log(lobbyID, username)
      socketRef.current.emit('switchLobby', { lobbyID }, username)

      socketRef.current.on('updateLobby', function (newLobby) {
        socketRef.current.room = newLobby.lobbyID;
      });
      socketRef.current.on("message", ({ name, message }, room) => {
        setChat([...chat, { name, message }])
      })
      socketRef.current.on("gameStart", () => {
        console.log("Game Start")
        setInCountdown(true)
        setTimerActive(true);
      })

      socketRef.current.on("gameLines", (gameLines) => {
        console.log(gameLines[0])
      })


      socketRef.current.on("matchResults", (matchResultsArray) => {
        console.log("GAMEEND")
        console.log(matchResultsArray)
        setLeaderboard(matchResultsArray);
        sortLeaderBoard(matchResultsArray);
        setLeaderBoardOpen(o => !o);

      })

      socketRef.current.on("playerIndexUpdate", (playerName, playerIndex, playerLineArrayIndex) => {
        console.log("Index update: ", playerName, playerIndex, playerLineArrayIndex)
        setLobbyPlayers((prev) => new Map(prev).set(playerName, { index: playerIndex, lineArrayIndex: playerLineArrayIndex }))
      })

      socketRef.current.on("pollAllPlayers", () => {
        socketRef.current.emit("sendInLobby", username)
      })

      socketRef.current.on("pollAllPlayers", () => {
        socketRef.current.emit("sendInLobby", username)

      })

      socketRef.current.on("playerJoined", (username) => {
        console.log("username " + username)

        setLobbyPlayers(prev => new Map([...prev, [username, { index: 0, lineArrayIndex: 0 }]]))

      })

      socketRef.current.on("gameLines", (lineArray_) => {
        la = lineArray_
        setLineArray(lineArray_)
        setCurrentRandomWords(la[lineArrayIndex])
        setLineArrayIndex((prev) => prev + 1)

        setNextUpRandomWords(la[lineArrayIndex + 1])
        setLineArrayIndex(prev => prev + 1)
        console.log(lineArray, lineArray_)
      })

      return () => socketRef.current.disconnect()
    },
    []
  )

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const onMessageSubmit = (e) => {
    const { name, message } = state
    socketRef.current.emit("message", { name, message }, socketRef.current.room)
    e.preventDefault()
    setState({ message: "", name })
  }

  // -------------------------------------------------------

  // ---- Game Code ----------------------------------------

  function reset() {
    setTimerActive(false);
    setIndex(0);
    setLineIndex(0)
    setTimer(staticCountdown);
    setCountdown(3);
  }

  // ---- Key Press Events ---------------------------------
  useEffect(() => {

    document.addEventListener('keydown', onKeyPress);

    // if (lineIndex === randomWords.length - 1) {
    //   reset()
    // }

    return () => {
      document.removeEventListener('keydown', onKeyPress);
    };
  }, [lineIndex, timerActive, randomWords, nextUpRandomWords, inCountdown])

  function onLineChange() {
    setCurrentRandomWords(nextUpRandomWords)
    setNextUpRandomWords(lineArray[lineArrayIndex])
    setLineArrayIndex(prev => prev + 1)
    setLineIndex(0)
  }

  const onKeyPress = (event) => {

    switch (event.key) {

      // case "Enter":
      //   // setUpdateOnce(true);
      //   if (!timerActive) {
      //     setTimerActive(true);
      //     if (countdownToggleChecked)
      //       setInCountdown(true);
      //     else
      //       setInCountdown(false);
      //   }
      //   break;

      // case "Escape":
      //   console.log("correct");
      //   break;
      //EDITED TO MAKE LETTER MISSES UPDATE
      default:
        if (timerActive && !inCountdown) {

          if (event.key === randomWords[lineIndex]) {

            setLineIndex((lineIndex) => lineIndex + 1)
            setIndex((index) => index + 1);

            if (lineIndex === randomWords.length - 1) {
              onLineChange()
            }
            console.log(props.username, lineIndex, lineArrayIndex - 2, socketRef.current.room)
            socketRef.current.emit("sendPlayerIndex", props.username, lineIndex, lineArrayIndex - 2, socketRef.current.room)
          }
          // Do we add logged in stats for multiplayer?
          //  else if (event.key != randomWords[lineIndex] && props.loggedIn) {
          //   props.incrementMissed(randomWords[lineIndex]);
          // }
        }
        break;
    }
  };

  const grossWPM = () => {
    var words = (index / 5);
    var wpm = ((words / WPMTime) * 60).toFixed(2);
    console.log(wpm, words, index, WPMTime)
    return wpm;
  };

  function sortLeaderBoard(matchResultsArray){
    function compare(a, b) {
      if (a.WPM < b.WPM) {
        return -1;
      }
      if (a.WPM > b.WPM) {
        return 1;
      }
      return 0;
    }

    var sortedArray = matchResultsArray.sort(compare);
    setLeaderboard(sortedArray);
  }


  // -------------------------------------------------------

  // ---- Gamer Timer Countdown Logic ----------------------

  function useInterval(callback, delay) {

    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    if (!inCountdown && timer === 0) {

      var WPM = grossWPM()
      console.log("wpm: ", WPM);
      socketRef.current.emit("gameEnd", username, grossWPM(), socketRef.current.room)

      reset();

    } else if (inCountdown) {
      if (countdown === 1) {
        setInCountdown(false);
        setNumEntries(0);
        setWPMTime(timer);
      } else {
        setCountdown(countdown => countdown - 1)
      }
    } else {
      setTimer(timer => timer - 1);
      setNumEntries(index);
    }
  }, timerActive ? 1000 : null);

  // ---------------------------------------------------




  return (
    <div className="container">
      <OpponentTestVisual lobbyPlayers={lobbyPlayers} lineArray={lineArray} />

      <div className="timer-wrapper-multiplayer">
        <div style={timerActive && !inCountdown ? { color: 'var(--selection-color)', textShadow: ' 0px 0px 9px var(--selection-color)' } : { color: 'var(--text-color)' }} className="timer">
          {timer}s
        </div>

      </div>

      <div className="word-base">

        {timerActive ? null :
          <div className="start-signal-wrapper">
            Waiting for players...
          </div>}

        {timerActive && inCountdown ?
          <div className="countdown">
            {countdown}
          </div>
          : null}

        <EndingPopup
          open={leaderBoardOpen}
          onClose={closeLeaderBoard}
          position="center"
          modal
          closeOnDocumentClick
        >
          <Leaderboard>
            <div style={{ color: 'var(--selection-color)', fontWeight: 'bold' }}>
              {leaderboard[0].player + " won!"}
              <br />
              {leaderboard[0].WPM + " WPM"}
            </div>
            <div>
              {"2nd: " + leaderboard[1].player + " " + leaderboard[1].WPM + " WPM"}
              <br />
              {"3rd: " + leaderboard[2].player + " " + leaderboard[2].WPM + " WPM"}
            </div>
            {/* {leaderboard.map(function (player, idx) {
              return (
                <div>{idx+1}. {player.player}  {player.WPM} WPM</div>
              )
            })} */}
          </Leaderboard>
        </EndingPopup>


        <div className="test-line-container">
          {randomWords.split("").map(function (char, idx) {
            return (
              <span key={idx}
                className={(idx < lineIndex) ? 'correct' : 'default'}
              >
                {(idx === lineIndex) ? <span className="cursor" ></span> : <span />}
                {char}
              </span>
            )
          })}
        </div>

        <div className="test-line-container next-up">
          {nextUpRandomWords}
        </div>
      </div>
    </div>
  )
}

export default MultiplayerGame

const EndingPopup = styled(Popup)`
    
  // use your custom style for ".popup-overlay"
  &-overlay {
  }
  // use your custom style for ".popup-content"
  &-content {
    padding: 1em;
    background: var(--primary-color);
    border-style: solid;
    border-color: var(--selection-color);
  } 
`;

const Leaderboard = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--text-color);
  font-family: "almarai";
  font-size: 2em;
  justify-content: center;
  text-align: center;
`