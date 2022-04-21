import React, { useState, useEffect } from 'react'
import '../../styles/Leaderboard.css'
import Scrollbars from 'react-custom-scrollbars-2'
import styled from 'styled-components'

const SortButton = styled.div`
  background: var(--dark-bg);
  margin-inline: 1em;
  border-style: solid;
  border-width: 1px;
  border-color: var(--selection-color);
  color: var(--text-color);
  border-radius: 5%/20%;
  padding: .5em;
  padding-inline: 0;
`

const Leaderboard = ({accountStats}) => {

    const [current, setCurrent] = useState(9)

    return (
        <div className='leaderboard-base'>
            <div className='leaderboard-header'>
                <SortButton>#</SortButton>
                <SortButton>Name</SortButton>
                <SortButton className='sort-button' onClick={() => setCurrent(9)}><span style={current == 9 ? {color: 'var(--selection-color)'} : {color: 'var(--text-color)'}}>Rank</span></SortButton>
                <SortButton className='sort-button' onClick={() => setCurrent(10)}><span style={current == 10 ? {color: 'var(--selection-color)'} : {color: 'var(--text-color)'}}>WPM Top</span></SortButton>
                <SortButton className='sort-button' onClick={() => setCurrent(11)}><span style={current == 11 ? {color: 'var(--selection-color)'} : {color: 'var(--text-color)'}}>WPM Avg</span></SortButton>
            </div>
            <div className='leaderboard-list'>
                <Scrollbars autoHeight autoHeightMin={'58em'}>
                    {accountStats[current].map(function (object, index) {
                        return (
                            <div style={index % 2 == 0 ? {background: 'var(--dark-bg)'} : {background: 'var(--primary-color)'}} className='leaderboard-person-base'>
                                <div>{index + 1}</div>
                                <div>{object.display_name}</div>
                                <div>{object.mmr} mmr</div>
                                <div>{object.wpm_top} wpm</div>
                                <div>{object.wpm_average} wpm</div>
                                </div>
                        )
                    })}
                </ Scrollbars>
            </div>
        </div>
    )
}

export default Leaderboard