import React from 'react'
import Account from './Account'
import { getStats } from '../../utils/apiUtils';

const rp = require('request-promise');

//This is only an idea for future implementation

var account = {
    account_id: -1,
    display_name: "",
    user_email: "",
    photo: -1,
    avg_wpm: -1,
    top_wpm: -1,
    letter_misses: "",
    total_words: -1,
    total_time: -1
};

//when clicking view account statistics, OtherUsers will be called by passing the user's name
//But when in account stats page, user can type in a box to search for other user's stats using their name
export const OtherUsers = (name) => {
    callRetreieve(name)
}

export function callRetrieve(name) {

    account = {
        account_id: -1,
        display_name: "",
        user_email: "",
        photo: -1
    };

    var options = {//request accountinfo through name
        url: ''                      
    };

    rp(options)
        .then(function (acc) {
            console.log(acc);
            if (acc != "Fail") {// on success return account_id
                var info = JSON.parse(acc);
                account.account_id = info[0].account_id;
            }
        })
        .finally(function () {
            console.log(account);
        })
        .catch(function (err) {
        });

    if (account.account_id == -1) {
        return (<div> User name does not exist </div>)
    } else {
            //on success getting account_id, we will request again to get accountinfo using ID
        return (
           ""//After getting account info, we will populate page with info.
        )
    }
}
export default OtherUsers;