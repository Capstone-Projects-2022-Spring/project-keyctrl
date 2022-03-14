import { useState } from 'react'
import '../../styles/TypingTest.css'

const OpponentTestVisual = ({ lobbyPlayers, lineArray }) => {

    // console.log(lobbyPlayers, lineArray[0])

    return (
        <div className="word-base">
            {Array.from(lobbyPlayers, ([key, value]) => ({ key, value })).map(function (obj, idx_) {
                return (
                    <div>
                        {obj.key}
                        <div className="test-line-container">
                            {lineArray[obj.value.lineArrayIndex].split("").map(function (char, idx) {
                                return (
                                    <span key={idx}
                                        className={(idx < obj.value.index) ? 'correct' : 'default'}
                                    >
                                        {(idx === obj.value.index) ? <span className="cursor" ></span> : <span />}
                                        {char}
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default OpponentTestVisual