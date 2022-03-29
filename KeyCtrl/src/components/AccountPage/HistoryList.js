import { React, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import '../../styles/HistoryList.css'
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md'
import RankedExpandedHistory from './MatchHistory/RankedExpandedHistory'

const HistoryList = ({ title }) => {

    const [expandedGameindex, setExpandedGameIndex] = useState([])

    const expandGame = (index, state) => {
        let newArr = [...expandedGameindex]
        newArr[index] = state
        setExpandedGameIndex(newArr)
    }

    return (
        <div className='hl-base'>
            <div className='hl-title'>
                {title}
            </div>
            <Scrollbars autoHeight autoHeightMin={'18em'}>
                <div className='base-game-container'>
                    <div className="game-container">
                        <div className='hl-inner-element' style={{ color: '#30DA37' }}> Victory! </div>
                        <div className='hl-inner-element' style={{ color: 'var(--selection-color)' }}> 1st Place</div>
                        <div className='hl-inner-element' style={{ color: 'var(--selection-color)' }}> +20 MMR</div>
                        {expandedGameindex[0] === true ?
                            <MdOutlineExpandLess onClick={() => expandGame(0, false)} className='expand-game-button' />
                            : <MdOutlineExpandMore onClick={() => expandGame(0, true)} className='expand-game-button' />}
                    </div>
                    {expandedGameindex[0] === true ?
                            <RankedExpandedHistory />
                            : null
                    }
                </div>



                

                 <div className='base-game-container'>
                    <div className="game-container">
                        <div className='hl-inner-element' style={{ color: '#30DA37' }}> Victory! </div>
                        <div className='hl-inner-element' style={{ color: 'var(--selection-color)' }}> 1st Place</div>
                        <div className='hl-inner-element' style={{ color: 'var(--selection-color)' }}> +20 MMR</div>
                        {expandedGameindex[1] === true ?
                            <MdOutlineExpandLess onClick={() => expandGame(1, false)} className='expand-game-button' />
                            : <MdOutlineExpandMore onClick={() => expandGame(1, true)} className='expand-game-button' />}
                    </div>
                    {expandedGameindex[1] === true ?
                        <div className='expanded-game-container'>
                            Game Details
                            <div>I will have</div>
                            <div>Lots of stats here</div>
                            </div> : null
                    }
                </div>

                <div className='base-game-container'>
                    <div className="game-container">
                        <div className='hl-inner-element' style={{ color: '#30DA37' }}> Victory! </div>
                        <div className='hl-inner-element' style={{ color: 'var(--selection-color)' }}> 1st Place</div>
                        <div className='hl-inner-element' style={{ color: 'var(--selection-color)' }}> +20 MMR</div>
                        {expandedGameindex === 1 ?
                            <MdOutlineExpandLess onClick={() => expandGame(-1)} className='expand-game-button' />
                            : <MdOutlineExpandMore onClick={() => expandGame(0)} className='expand-game-button' />}
                    </div>
                    {expandedGameindex === 1 ?
                        <div className='expanded-game-container'>Hello?</div> : null
                    }
                </div>
                <div className='base-game-container'>
                    <div className="game-container">
                        <div className='hl-inner-element' style={{ color: '#30DA37' }}> Victory! </div>
                        <div className='hl-inner-element' style={{ color: 'var(--selection-color)' }}> 1st Place</div>
                        <div className='hl-inner-element' style={{ color: 'var(--selection-color)' }}> +20 MMR</div>
                        {expandedGameindex === 1 ?
                            <MdOutlineExpandLess onClick={() => expandGame(-1)} className='expand-game-button' />
                            : <MdOutlineExpandMore onClick={() => expandGame(0)} className='expand-game-button' />}
                    </div>
                    {expandedGameindex === 1 ?
                        <div className='expanded-game-container'>Hello?</div> : null
                    }
                </div>
                <div className='base-game-container'>
                    <div className="game-container">
                        <div className='hl-inner-element' style={{ color: '#30DA37' }}> Victory! </div>
                        <div className='hl-inner-element' style={{ color: 'var(--selection-color)' }}> 1st Place</div>
                        <div className='hl-inner-element' style={{ color: 'var(--selection-color)' }}> +20 MMR</div>
                        {expandedGameindex === 1 ?
                            <MdOutlineExpandLess onClick={() => expandGame(-1)} className='expand-game-button' />
                            : <MdOutlineExpandMore onClick={() => expandGame(0)} className='expand-game-button' />}
                    </div>
                    {expandedGameindex === 1 ?
                        <div className='expanded-game-container'>Hello?</div> : null
                    }
                </div>
                <div className='base-game-container'>
                    <div className="game-container">
                        <div className='hl-inner-element' style={{ color: '#30DA37' }}> Victory! </div>
                        <div className='hl-inner-element' style={{ color: 'var(--selection-color)' }}> 1st Place</div>
                        <div className='hl-inner-element' style={{ color: 'var(--selection-color)' }}> +20 MMR</div>
                        {expandedGameindex === 1 ?
                            <MdOutlineExpandLess onClick={() => expandGame(-1)} className='expand-game-button' />
                            : <MdOutlineExpandMore onClick={() => expandGame(0)} className='expand-game-button' />}
                    </div>
                    {expandedGameindex === 1 ?
                        <div className='expanded-game-container'>Hello?</div> : null
                    }
                </div>
                <div className='base-game-container'>
                    <div className="game-container">
                        <div className='hl-inner-element' style={{ color: '#30DA37' }}> Victory! </div>
                        <div className='hl-inner-element' style={{ color: 'var(--selection-color)' }}> 1st Place</div>
                        <div className='hl-inner-element' style={{ color: 'var(--selection-color)' }}> +20 MMR</div>
                        {expandedGameindex === 1 ?
                            <MdOutlineExpandLess onClick={() => expandGame(-1)} className='expand-game-button' />
                            : <MdOutlineExpandMore onClick={() => expandGame(0)} className='expand-game-button' />}
                    </div>
                    {expandedGameindex === 1 ?
                        <div className='expanded-game-container'>Hello?</div> : null
                    }
                </div>
                <div className='base-game-container'>
                    <div className="game-container">
                        <div className='hl-inner-element' style={{ color: '#30DA37' }}> Victory! </div>
                        <div className='hl-inner-element' style={{ color: 'var(--selection-color)' }}> 1st Place</div>
                        <div className='hl-inner-element' style={{ color: 'var(--selection-color)' }}> +20 MMR</div>
                        {expandedGameindex === 0 ?
                            <MdOutlineExpandLess onClick={() => expandGame(-1)} className='expand-game-button' />
                            : <MdOutlineExpandMore onClick={() => expandGame(0)} className='expand-game-button' />}
                    </div>
                    {expandedGameindex === 1 ?
                        <div className='expanded-game-container'>Hello?</div> : null
                    }
                </div>
                <div className='base-game-container'>
                    <div className="game-container">
                        <div className='hl-inner-element' style={{ color: '#30DA37' }}> Victory! </div>
                        <div className='hl-inner-element' style={{ color: 'var(--selection-color)' }}> 1st Place</div>
                        <div className='hl-inner-element' style={{ color: 'var(--selection-color)' }}> +20 MMR</div>
                        {expandedGameindex === 1 ?
                            <MdOutlineExpandLess onClick={() => expandGame(-1)} className='expand-game-button' />
                            : <MdOutlineExpandMore onClick={() => expandGame(0)} className='expand-game-button' />}
                    </div>
                    {expandedGameindex === 1 ?
                        <div className='expanded-game-container'>Hello?</div> : null
                    }
                </div>
                <div className='base-game-container'>
                    <div className="game-container">
                        <div className='hl-inner-element' style={{ color: '#30DA37' }}> Victory! </div>
                        <div className='hl-inner-element' style={{ color: 'var(--selection-color)' }}> 1st Place</div>
                        <div className='hl-inner-element' style={{ color: 'var(--selection-color)' }}> +20 MMR</div>
                        {expandedGameindex === 1 ?
                            <MdOutlineExpandLess onClick={() => expandGame(-1)} className='expand-game-button' />
                            : <MdOutlineExpandMore onClick={() => expandGame(0)} className='expand-game-button' />}
                    </div>
                    {expandedGameindex === 1 ?
                        <div className='expanded-game-container'>Hello?</div> : null
                    }
                </div>
                <div className='base-game-container'>
                    <div className="game-container">
                        <div className='hl-inner-element' style={{ color: '#30DA37' }}> Victory! </div>
                        <div className='hl-inner-element' style={{ color: 'var(--selection-color)' }}> 1st Place</div>
                        <div className='hl-inner-element' style={{ color: 'var(--selection-color)' }}> +20 MMR</div>
                        {expandedGameindex === 1 ?
                            <MdOutlineExpandLess onClick={() => expandGame(-1)} className='expand-game-button' />
                            : <MdOutlineExpandMore onClick={() => expandGame(0)} className='expand-game-button' />}
                    </div>
                    {expandedGameindex === 1 ?
                        <div className='expanded-game-container'>Hello?</div> : null
                    }
                </div>
            </Scrollbars>
        </div>
    )
}

export default HistoryList