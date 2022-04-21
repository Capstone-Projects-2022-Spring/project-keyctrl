import React from 'react'
import '../../../styles/HistoryList.css'
import PostMatchPlayer from '../../MultiplayerPage/PostMatchPlayer'

const RankedExpandedHistory = ({ accountInfo, object, mode }) => {
    var dt = new Date(object.match_date)
    return (
        <div className='expanded-game-container'>
            <div className='game-container-date'>
                {dt.toLocaleString()}
            </div>
            <div className='game-container-leaderboard'>
                {mode == "Online" ?
                    <span>
                        <PostMatchPlayer loggedIn={false} index={1} playerName={object.player1_name} wpm={object.player1_wpm} myAccId={accountInfo.account_id} accountId={object.player1_id}/>
                        <PostMatchPlayer loggedIn={false} index={2} playerName={object.player2_name} wpm={object.player2_wpm} myAccId={accountInfo.account_id} accountId={object.player2_id}/>
                        <PostMatchPlayer loggedIn={false} index={3} playerName={object.player3_name} wpm={object.player3_wpm} myAccId={accountInfo.account_id} accountId={object.player3_id}/>
                        <PostMatchPlayer loggedIn={false} index={4} playerName={object.player4_name} wpm={object.player4_wpm} myAccId={accountInfo.account_id} accountId={object.player4_id}/>
                    </span> :
                    <span>
                        <PostMatchPlayer inRanked={true} loggedIn={false} index={1} playerName={object.player1_name} wpm={object.player1_wpm} myAccId={accountInfo.account_id} accountId={object.player1_id}/>
                        <PostMatchPlayer inRanked={true} loggedIn={false} index={2} playerName={object.player2_name} wpm={object.player2_wpm} myAccId={accountInfo.account_id} accountId={object.player2_id}/>
                        <PostMatchPlayer inRanked={true} loggedIn={false} index={3} playerName={object.player3_name} wpm={object.player3_wpm} myAccId={accountInfo.account_id} accountId={object.player3_id}/>
                        <PostMatchPlayer inRanked={true} loggedIn={false} index={4} playerName={object.player4_name} wpm={object.player4_wpm} myAccId={accountInfo.account_id} accountId={object.player4_id}/>
                    </span>
                }
            </div>
        </div>
    )
}

export default RankedExpandedHistory
