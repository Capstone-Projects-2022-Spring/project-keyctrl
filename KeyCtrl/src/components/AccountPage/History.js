import React from 'react'
import HistoryList from './HistoryList'
import '../../styles/HistoryList.css'

 var matchHistory = {
        game_mode: 0,
        avg_wpm: 54.54
 }

const History = () => {
  return (
    <div className='history-container'>
        <HistoryList title={'Solo'}/>
        <HistoryList title={'Online'}/>
        <HistoryList title={'Ranked'}/>
    </div>
  )
}

export default History