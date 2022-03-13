import { useState } from 'react'
import '../../styles/TypingTest.css'

const OpponentTestVisual = ({ lobbyPlayers, idx1, idx2, idx3 }) => {

    const [choppedCurrentLine, setChoppedCurrentLine] = useState("");    //setting its use state

    return (
        <div className="word-base">
            Player 1

            {Object.entries(lobbyPlayers).map((arr) => {
                return (
                    <div className="test-line-container">
                        {choppedCurrentLine.split("").map(function (char, idx) {
                            return (
                                <span key={idx}
                                    className={(idx < idx1) ? 'correct' : 'default'}
                                >
                                    {(idx === idx1) ? <span className="cursor" ></span> : <span />}
                                    {char}
                                </span>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default OpponentTestVisual