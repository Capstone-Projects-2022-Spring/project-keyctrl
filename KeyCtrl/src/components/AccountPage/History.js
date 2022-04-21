import React from 'react'
import HistoryList from './HistoryList'
import '../../styles/HistoryList.css'

 var matchHistory = {
        game_mode: 0,
        avg_wpm: 54.54
 }

const History = ({accountInfo, accountStats}) => {
  return (
    <div className='history-container'>
        {/* <HistoryList title={'Solo'}/> */}
        <HistoryList accountInfo={accountInfo} gameHistory={accountStats[7]} title={'Online'}/>
        <HistoryList accountInfo={accountInfo} gameHistory={accountStats[8]} title={'Ranked'}/>
    </div>
  )
}

export default History