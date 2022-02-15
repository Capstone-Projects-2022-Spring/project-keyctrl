import { useState, useEffect, useRef } from "react";
import './TypingTest.css'
import * as api from '../../utils/apiUtils.js'

const TypingTest = (props) => {
    const [staticCountdown, setStaticCountdown] = useState(15);
    const [countdown, setCountdown] = useState(1);

    function reset() {
        props.setTimerActive(false);
        props.setIndex(0);
        props.setTimer(staticCountdown);
        setCountdown(1);
        props.newWords();
    }

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
        if (!props.timerActive) {
            setStaticCountdown(count);
            props.setTimer(count);
        }
    };

    useInterval(() => {
        if (!props.inCountdown && props.timer === 0) {
            reset();

        } else if (props.inCountdown) {
            if (countdown === 1) {
                props.setInCountdown(false);
                props.setNumEntries(0);
                props.setWPMTime(staticCountdown);
            } else {
                setCountdown(countdown => countdown - 1)
            }
        } else {
            props.setTimer(timer => timer - 1);
            props.setNumEntries(props.index);
        }
    }, props.timerActive ? 1000 : null);

    return (
        <div className="container">
            <div className="timer-wrapper">
                <div style={props.timerActive && !props.inCountdown ? { color: '#50E3C2', textShadow: ' 0px 0px 9px #50E3C2' } : { color: '#75749C' }} className="timer">
                    {props.timer}s
                </div>

                <div className="right-elements">
                    <div className="timer-select">
                        <div onClick={() => setCount(15)} style={staticCountdown === 15 ? { color: '#50E3C2', textShadow: ' 0px 0px 9px #50E3C2' } : null} className="time-button">
                            15
                        </div>
                        <div onClick={() => setCount(30)} style={staticCountdown === 30 ? { color: '#50E3C2', textShadow: ' 0px 0px 9px #50E3C2' } : null} className="time-button">
                            30
                        </div>
                        <div onClick={() => setCount(45)} style={staticCountdown === 45 ? { color: '#50E3C2', textShadow: ' 0px 0px 9px #50E3C2' } : null} className="time-button">
                            45
                        </div>
                        <div onClick={() => setCount(60)} style={staticCountdown === 60 ? { color: '#50E3C2', textShadow: ' 0px 0px 9px #50E3C2' } : null} className="time-button">
                            60
                        </div>
                    </div>
                </div>
            </div>

            <div className="word-base">

                {props.timerActive ? null : <div className="start-signal-wrapper">

                    Correct Entries: {props.numEntries} <br />
                    Your WPM: {props.grossWPM()} <br /> <br />
                    <div className="start-signal">
                        Press Enter To Start!
                    </div>
                </div>}
                {props.timerActive && props.inCountdown && props.countdownToggleChecked ?
                    <div className="countdown">
                        Get Ready!
                    </div>
                    : null}
                <div className="test-text">
                    {props.words.split("").map(function (char, idx) {
                        return (
                            <span key={idx}
                                className={(idx < props.index) ? 'right' : 'default'}
                            >
                                {char}
                            </span>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default TypingTest;