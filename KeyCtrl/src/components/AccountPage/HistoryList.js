import { React, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import '../../styles/HistoryList.css'
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md'
import RankedExpandedHistory from './MatchHistory/RankedExpandedHistory'

const HistoryList = ({ accountInfo, gameHistory, title }) => {

    const [expandedGameindex, setExpandedGameIndex] = useState([])

    const expandGame = (index, state) => {
        let newArr = [...expandedGameindex]
        newArr[index] = state
        setExpandedGameIndex(newArr)
    }

    function getDisplay(){
        return 
    }

    return (
        <div className='hl-base'>
            <div className='hl-title'>
                {title}
            </div>
            <Scrollbars autoHeight autoHeightMin={'18em'}>
                {gameHistory.slice(0).reverse().map(function (object, idx) {
                    var wpm;
                    var place;

                    if (object.player1_id == accountInfo.account_id) {
                        wpm = object.player1_wpm
                        place = 1
                    } else if (object.player2_id == accountInfo.account_id) {
                        wpm = object.player2_wpm
                        place = 2
                    } else if (object.player3_id == accountInfo.account_id) {
                        wpm = object.player3_wpm
                        place = 3
                    } else {
                        wpm = object.player4_wpm
                        place = 4
                    }
                    function getPlace(place) {
                        switch (place) {
                            case 1:
                                return "1st"
                                break;
                            case 2:
                                return "2nd"
                                break;
                            case 3:
                                return "3rd"
                                break;
                            case 4:
                                return "4th"
                                break;
                        }
                    }

                    return (
                        <div className='base-game-container'>
                            <div className="game-container">
                                <div className='hl-inner-element' style={place <= 2 ? { color: '#30DA37' } : { color: 'var(--warning)' }}> {place <= 2 ? "Victory!" : "Defeat!"} </div>
                                <div className='hl-inner-element' style={{ color: 'var(--selection-color)' }}>{getPlace(place)}</div>
                                <div className='hl-inner-element' style={{ color: 'var(--selection-color)' }}> {wpm} wpm</div>
                                {expandedGameindex[idx] === true ?
                                    <MdOutlineExpandLess onClick={() => expandGame(idx, false)} className='expand-game-button' />
                                    : <MdOutlineExpandMore onClick={() => expandGame(idx, true)} className='expand-game-button' />}
                            </div>
                            {expandedGameindex[idx] === true ?
                                <RankedExpandedHistory mode={title} accountInfo={accountInfo} object={object} />
                                : null
                            }
                        </div>
                    )
                })}
            </Scrollbars>
        </div>
    )
}

export default HistoryList