import { useState, useEffect, useRef, setState } from "react";
import '../../styles/TypingTest.css'
import PropTypes from "prop-types"
import { IoIosArrowBack } from "react-icons/io";
import styled from "styled-components"
import * as api from '../../utils/apiUtils.js'
import TypingSettings from "./TypingTestSettings";

/**
 * @module TypingTest 
 * */


/**
 * Component for displaying typing test.
 * @component TypingTest
 * @param {any} props contains list of all props needed for typing test
 * @description Typing test component that displays and runs the game
 * @returns Component to be displayed
 * 
 * @example
 * <TypingTest
          timerActive={timerActive}
          setTimerActive={setTimerActive}
          inCountdown={inCountdown}
          setInCountdown={setInCountdown}
          setIndex={setIndex}
          words={randomWords}             
          index={index}
          countdownToggleChecked={countdownToggleChecked}
          setCountdownToggleChecked={setCountdownToggleChecked}
          newWords={newWords}
          accountInfo={accountInfo}
          setAccountInfo={setAccountInfo}
          loggedIn={loggedIn}
          updateAccInfo={updateAccInfo}
          timer={timer}
          setTimer={setTimer}
          numEntries={numEntries}
          setNumEntries={setNumEntries}
          WPMTime={WPMTime}
          setWPMTime={setWPMTime}
          grossWPM={grossWPM}
        />

 */

export const TypingTest = (props) => {
    const [staticCountdown, setStaticCountdown] = useState(15);
    const [countdown, setCountdown] = useState(0);
    const [choppedCurrentLine, setChoppedCurrentLine] = useState("");    //setting its use state
    const [lineIndex, setLineIndex] = useState(0)
    const [timer, setTimer] = useState(15);
    const [timerActive, setTimerActive] = useState(false);
    const [countdownToggleChecked, setCountdownToggleChecked] = useState(true);
    const [inCountdown, setInCountdown] = useState(false)
    const [currentLineLength, setCurrentLineLength] = useState(0);
    const [lastWPM, setLastWPM] = useState(0)

    const [letterMisses, setLetterMisses] = useState([])
    const [randomWords, setCurrentRandomWords] = useState(" ");    //setting its use state
    const [nextUpRandomWords, setNextUpRandomWords] = useState(" ");
    var randWordsFunc = require('random-words');          //Must require random-words


    function newWords() {
        var startingLine = getNewWordsLine()
        var nextUpLine = getNewWordsLine()

        setCurrentRandomWords(startingLine);
        setNextUpRandomWords(chopLineToLength(nextUpLine))
        console.log(startingLine)
    }

    useEffect(() => {   //using another useEffect so random words does not refresh everytime.

        props.setWPMTime(staticCountdown)
        newWords();  //Setting how many words given for the test right here.

    }, [])

    /**
     * @function reset
     * @description resets information variables related to running the typing test
     */

    function reset() {
        //updating stats here
        setLastWPM(props.grossWPM())
        props.updateAccInfo();
        setTimerActive(false);
        props.setIndex(0);
        setLineIndex(0)
        setTimer(staticCountdown);
        newWords();
    }

    /**
     * 
     * @param {any} callback used to callback to previous referance of page
     * @param {any} delay amount to be delayed
     * @function useInterval
     * @description Used to set a delay/countdown that is persistant over react renders
     */
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

    const setCount = (count) => {
        if (!timerActive) {
            setStaticCountdown(count);
            props.setAppStaticCountdown(count)
            setTimer(count);
            props.setWPMTime(count);
        }
    };

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
        const words = randWordsFunc({ exactly: 20, join: ' ' });
        const letters = words.length;
        console.log("letter", letters, "words", 13);

        return words
    }

    function onLineChange() {
        setCurrentRandomWords(nextUpRandomWords)
        setNextUpRandomWords(chopLineToLength(getNewWordsLine()))
        setLineIndex(0)
    }

    useEffect(() => {

        document.addEventListener('keydown', onKeyPress);

        if (timer === 0 && !timerActive) {
            props.setUpdateOnce(true);
        }

        if (!props.timerActive) {
            setChoppedCurrentLine(chopLineToLength(randomWords))
            setCurrentLineLength(choppedCurrentLine.length)
        } else if (lineIndex === choppedCurrentLine.length - 1) {
            reset()
        }

        return () => {
            document.removeEventListener('keydown', onKeyPress);
        };
    }, [randomWords, nextUpRandomWords, lineIndex, timerActive, inCountdown])

    const onKeyPress = (event) => {

        switch (event.key) {

            case "Enter":
                // setUpdateOnce(true);
                if (!timerActive || props.showFriendList) {
                    setTimerActive(true);
                    if (countdownToggleChecked && countdown > 0) {
                        // add occurances at index[0]
                        if (props.loggedIn)
                            incrementOccurrances(randomWords[0])
                    }
                    else
                        setInCountdown(false);
                    props.setNumEntries(0);
                }
                break;

            case "Escape":
                console.log("correct");
                setTimerActive(false);
                props.setIndex(0);
                setLineIndex(0)
                setTimer(staticCountdown);
                newWords();
                break;
            //EDITED TO MAKE LETTER MISSES UPDATE
            default:
                if (timerActive && !inCountdown) {
                    if (event.key === randomWords[lineIndex]) {
                        // add occurances here for next letter
                        if (props.loggedIn)
                            incrementOccurrances(randomWords[lineIndex + 1])

                        setLineIndex((lineIndex) => lineIndex + 1)
                        props.setIndex((index) => index + 1);

                        if (lineIndex === currentLineLength - 1) {
                            onLineChange()
                        }

                    } else if (event.key != randomWords[lineIndex] && props.loggedIn) {
                        incrementMissed(randomWords[lineIndex]);
                        // console.log(randomWords[index]);
                        // console.log(accountInfo.letter_misses);
                    }
                }
                break;
        }
    };

    useInterval(() => {
        if (!inCountdown && timer === 0) {
            reset();

        } else if (inCountdown) {
            if (countdown === 1) {
                // setInCountdown(false);
                // props.setNumEntries(0);
                // props.setWPMTime(staticCountdown);
                // } else if(countdown === 0){
                //     setInCountdown(false);
                //     props.setNumEntries(0);
                //     props.setWPMTime(staticCountdown);
            } else {
                setCountdown(countdown => countdown - 1)
            }
        } else {
            setTimer(timer => timer - 1);
            props.setNumEntries(props.index);
        }
    }, timerActive ? 1000 : null);

    function incrementMissed(letter) {

        if (letter != " ") {
            var jObj = props.accountStats[0][0]
            jObj[letter + "_misses"] = jObj[letter + "_misses"] + 1;
            var newAccountStats = props.accountStats
            newAccountStats[0][0] = jObj
            props.setAccountStats(newAccountStats);
        }
    }

    function incrementOccurrances(letter) {

        if (letter != " ") {
            var jObj = props.accountStats[0][0]
            jObj[letter + "_occurrences"] = jObj[letter + "_occurrences"] + 1;
            var newAccountStats = props.accountStats
            newAccountStats[0][0] = jObj
            props.setAccountStats(newAccountStats);
        }
    }


    return (
        <div className="container">
            <div className="timer-wrapper">
                <div style={timerActive && !inCountdown ? { color: 'var(--selection-color)', textShadow: ' 0px 0px 9px var(--selection-color)' } : { color: 'var(--text-color)' }} className="timer">
                    {timer}s
                </div>

                <div className="right-elements">
                    <div className="timer-select">
                        <div onClick={() => setCount(15)} style={staticCountdown === 15 ? { color: 'var(--selection-color)', textShadow: ' 0px 0px 9px var(--selection-color)' } : null} className="time-button">
                            15
                        </div>
                        <div onClick={() => setCount(30)} style={staticCountdown === 30 ? { color: 'var(--selection-color)', textShadow: ' 0px 0px 9px var(--selection-color)' } : null} className="time-button">
                            30
                        </div>
                        <div onClick={() => setCount(45)} style={staticCountdown === 45 ? { color: 'var(--selection-color)', textShadow: ' 0px 0px 9px var(--selection-color)' } : null} className="time-button">
                            45
                        </div>
                        <div onClick={() => setCount(60)} style={staticCountdown === 60 ? { color: 'var(--selection-color)', textShadow: ' 0px 0px 9px var(--selection-color)' } : null} className="time-button">
                            60
                        </div>
                    </div>
                </div>
            </div>

            <div className="word-base">

                {timerActive ? null : <div className="start-signal-wrapper">

                    Your WPM: {lastWPM} <br /> <br />
                    <div className="start-signal">
                        Press Enter To Start!
                    </div>
                </div>}
                {timerActive && inCountdown && countdownToggleChecked ?
                    <div className="countdown">
                        Get Ready!
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


            </div>
            {/* <div className="word-base"> */}
            <div className="test-line-container next-up">
                {nextUpRandomWords}
            </div>
            {/* </div> */}
        </div>
        // <TypingSettings />
    )

}

// Starting to introduce proptypes
TypingTest.propTypes = {
    timerActive: PropTypes.bool
}

export default TypingTest;