import React from 'react'
import '../../styles/Account.css'
import SingleStatDisplay from './SingleStatDisplay.js'
import StatKeyboard from './StatKeyboard.js'

/**
 * @module Account
 * @param {Object} accountInfo
 * @description Account page that is displayed when logged in, shows statistics and graphics related to typing activity
 * @returns Component to be displayed
 * @example
 * <Account accountInfo={accountInfo} />
 */


const Account = ({ accountInfo_ }) => {

    var accountInfo = { 
        top_wpm: 73.25,
        avg_wpm: 54.54,
        letter_misses: '{"a": "12", "b": "23", "c": "76", "d": "35", "e": "35", "f": "8", "g":"4","h":"14","i":"65","j":"15","k":"35","l":"76","m":"43","n":"76","o":"45","p":"45","q":"76","r":"36","s":"27","t":"98","u":"45","v":"87","w":"34","x":"76","y":"34","z":"54"}'
    }

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
