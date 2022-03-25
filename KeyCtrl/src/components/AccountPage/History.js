import React from 'react'
import HistoryList from './HistoryList'
import '../../styles/HistoryList.css'

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