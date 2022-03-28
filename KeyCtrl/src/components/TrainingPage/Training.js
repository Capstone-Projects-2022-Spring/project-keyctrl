import { useState, useEffect, useRef } from "react";
import '../../styles/TypingTest.css'
import PropTypes from "prop-types"
import styled from "styled-components"
import * as api from '../../utils/apiUtils.js'
import { wait } from "@testing-library/react";

const Training = (props) => {

    const [staticCountdown, setStaticCountdown] = useState(15);
    const [countdown, setCountdown] = useState(1);
    const [choppedCurrentLine, setChoppedCurrentLine] = useState("");    //setting its use state
    const [lineIndex, setLineIndex] = useState(0)
    const [timer, setTimer] = useState(15);
    const [timerActive, setTimerActive] = useState(false);
    const [countdownToggleChecked, setCountdownToggleChecked] = useState(true);
    const [inCountdown, setInCountdown] = useState(false)
    const [currentLineLength, setCurrentLineLength] = useState(0);

    const [randomWords, setCurrentRandomWords] = useState(" ");    //setting its use state
    const [nextUpRandomWords, setNextUpRandomWords] = useState(" ");
    var randWordsFunc = require('random-words');          //Must require random-words

    //Custom input states-----------------------------------------------
    const [wordBank, setWordBank] = useState([]);//Contains all the lines that will be used for custom words

    const showFile = async (e) => {//takes in and chops text of min 1 and max 60 into chopped
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            if (e.target.result != null) {
                var textTemp = e.target.result
                textTemp = textTemp.replace(/\s\s+/g, ' ');//remove all multiple spaces with single space
                console.log(textTemp)
                //var parts = textTemp.match(/.{1,60}/g) || [];//chop 60 per arr
                var parts = textTemp.split(" ")//split words by space
                console.log(parts)
                setWordBank(parts)
            }
        };
        reader.readAsText(e.target.files[0])

    }

    function customWordsFunc(amount) {
        var words = wordBank[Math.floor(Math.random() * wordBank.length)]
        console.log(wordBank)
        for (let i = 0; i < amount  - 1; i++) {
            words = words + " " + wordBank[Math.floor(Math.random() * wordBank.length)]
        }
        console.log(words)
        return words
    }

    //--------------------------------------------------------------------


    async function newWords() {
        var startingLine
        var nextUpLine

        startingLine = getNewWordsLine()
        nextUpLine = getNewWordsLine()
        setCurrentRandomWords(startingLine)
        setNextUpRandomWords(chopLineToLength(nextUpLine))

        console.log(startingLine)
    }

    useEffect(() => {   //using another useEffect so random words does not refresh everytime.
        newWords();  //Setting how many words given for the test right here.
    }, [wordBank])

    /**
     * @function reset
     * @description resets information variables related to running the typing test
     */

    function reset() {
        setTimerActive(false);
        props.setIndex(0);
        setLineIndex(0)
        setTimer(staticCountdown);
        setCountdown(1);
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
            setTimer(count);
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
        var words = []
        var letters = ""
        if (wordBank.length > 0) {// if there are words in wordbank, use it
            words = customWordsFunc(20)
            letters = words.length;
            console.log("Custom letter", letters, "words", words);
        } else {//default
            words = randWordsFunc({ exactly: 20, join: ' ' });
            letters = words.length;
            console.log("letter", letters, "words", words);
        }
        return words
    }

    async function onLineChange() {
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
                if (!timerActive) {
                    setTimerActive(true);
                    if (countdownToggleChecked)
                        setInCountdown(true);
                    else
                        setInCountdown(false);
                }
                break;

            case "Escape":
                console.log("correct");
                break;
            //EDITED TO MAKE LETTER MISSES UPDATE
            default:
                if (timerActive && !inCountdown) {
                    console.log(event.key + " " + randomWords[lineIndex])
                    if (event.key === randomWords[lineIndex]) {

                        setLineIndex((lineIndex) => lineIndex + 1)
                        props.setIndex((index) => index + 1);

                        if (lineIndex === currentLineLength - 1) {
                            onLineChange()
                        }

                    } else if (event.key != randomWords[lineIndex] && props.loggedIn) {
                        props.incrementMissed(randomWords[lineIndex]);
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
                setInCountdown(false);
                props.setNumEntries(0);
                props.setWPMTime(staticCountdown);
            } else {
                setCountdown(countdown => countdown - 1)
            }
        } else {
            setTimer(timer => timer - 1);
            props.setNumEntries(props.index);
        }
    }, timerActive ? 1000 : null);

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
                    Correct Entries: {props.numEntries} <br />
                    Your WPM: {props.grossWPM()} <br /> <br />
                    <input type="file" accept=".txt" onChange={(e) => showFile(e)} />
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

                <div className="test-line-container next-up">
                    {nextUpRandomWords}
                </div>
            </div>
        </div>
    )
}

Training.propTypes = {
    timerActive: PropTypes.bool
}

export default Training
