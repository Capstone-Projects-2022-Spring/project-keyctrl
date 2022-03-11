import { useState, useRef, useEffect, useInterval } from 'react'
import io from "socket.io-client"
import '../../styles/TypingTest.css'
import { PropTypes } from 'prop-types'
import OpponentTestVisual from './OpponentTestVisual';

const MultiplayerGame = (props) => {
  const [playerName, setPlayerName] = useState("TEMPNAME")
  const [staticCountdown, setStaticCountdown] = useState(15);
  const [countdown, setCountdown] = useState(3);
  const [choppedCurrentLine, setChoppedCurrentLine] = useState("");    //setting its use state
  const [lineIndex, setLineIndex] = useState(0)
  const [index, setIndex] = useState(0);
  const [timer, setTimer] = useState(15);
  const [timerActive, setTimerActive] = useState(false);
  const [inCountdown, setInCountdown] = useState(false)
  const [currentLineLength, setCurrentLineLength] = useState(0);
  const [numEntries, setNumEntries] = useState(0);
  const [WPMTime, setWPMTime] = useState(1);

  const [randomWords, setCurrentRandomWords] = useState(" ");    //setting its use state
  const [nextUpRandomWords, setNextUpRandomWords] = useState(" ");

  // ---- Server Communication -------------------------------------
  const [state, setState] = useState({ message: "", name: "" })
  const [chat, setChat] = useState([])

  const socketRef = useRef()

  var lobbyID = props.lobbyID

  useEffect(() => {
  },[])

  useEffect(
    () => {
      socketRef.current = io.connect("http://localhost:4000")
      console.log(lobbyID)
      socketRef.current.emit('switchLobby', { lobbyID })
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

      socketRef.current.on("playerIndexUpdate", (playerName, playerIndex) => {
        console.log("Player:" + playerName + " Index: " + playerIndex)
      })

      socketRef.current.on("gameLines", (lineArray) => {
        console.log(lineArray)
      })

      return () => socketRef.current.disconnect()
    },
    [chat]
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

    if (lineIndex === choppedCurrentLine.length - 1) {
      reset()
    }

    return () => {
      document.removeEventListener('keydown', onKeyPress);
    };
  }, [lineIndex, timerActive])

  function onLineChange() {
    // setCurrentRandomWords(nextUpRandomWords)
    // setNextUpRandomWords(chopLineToLength(getNewWordsLine()))
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

            if (lineIndex === currentLineLength - 1) {
              onLineChange()
            }
            socketRef.current.emit("sendPlayerIndex", (playerName, index, socketRef.current.room))
          }
          // Do we add logged in stats for multiplayer?
          //  else if (event.key != randomWords[lineIndex] && props.loggedIn) {
          //   props.incrementMissed(randomWords[lineIndex]);
          // }
        }
        break;
    }
  };

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
      reset();

    } else if (inCountdown) {
      if (countdown === 1) {
        setInCountdown(false);
        setNumEntries(0);
        setWPMTime(staticCountdown);
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
      <OpponentTestVisual />

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

        <div className="test-line-container">
          {choppedCurrentLine.split("").map(function (char, idx) {
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