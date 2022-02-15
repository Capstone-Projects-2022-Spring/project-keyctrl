import React from 'react'
import './Account.css'
import SingleStatDisplay from './SingleStatDisplay/SingleStatDisplay'
import StatKeyboard from './StatKeyboard/StatKeyboard'

const Account = ({ accountInfo }) => {

    var jObj = JSON.parse(accountInfo.letter_misses);
    console.log(Object.entries(jObj).sort((a,b) => b[1]-a[1]));
    //var topWPM = accountInfo.top_wpm;
    var sortedMisses = Object.entries(jObj).sort((a,b) => b[1]-a[1]);

    return (
        <div>
            <div className="acc-id">
                Account Statistics
            </div>
            <div className="stat-container">

                <div className="stats-wing" >
                    <SingleStatDisplay title="Top WPM" data={accountInfo.top_wpm == null ? 0 : Number(accountInfo.top_wpm).toFixed(2)} />
                    <SingleStatDisplay title="Avg WPM" data={accountInfo.avg_wpm == null ? 0 : accountInfo.avg_wpm.toFixed(2)} />
                </div>
                <StatKeyboard letter_misses={accountInfo.letter_misses} />
                <div className="stats-wing">
                    <SingleStatDisplay title="Most Missed" data={sortedMisses[0][0].toUpperCase()} />
                    <SingleStatDisplay title="Least Missed" data={sortedMisses[25][0].toUpperCase()} />
                </div>
            </div>
        </div>
    )
}

export default Account
