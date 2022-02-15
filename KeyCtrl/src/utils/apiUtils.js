const request = require('postman-request');
const rp = require('request-promise');

var account = {
    account_id: -1,
    display_name: "",
    user_email: "",
    password: "",
    photo: -1,
    avg_wpm: -1,
    top_wpm: -1,
    letter_misses: "",
    total_words: -1,
    total_time: -1
};


export function callLogin(username, password) {
    account = {
        account_id: -1,
        display_name: "",
        user_email: "",
        password: "",
        photo: -1
    };

    var options = {
        url: 'https://9x38qblue2.execute-api.us-east-1.amazonaws.com/dev/login?email='
        + username
        + '&pw=' + password
    };

    rp(options)
        .then(function(acc){
            console.log(acc);
            if(acc != "Invalid Login Credentials"){
                var info = JSON.parse(acc);
                account.account_id = info[0].account_id;
                account.display_name = info[0].display_name;
                account.user_email = info[0].user_email;
                account.password = info[0].password;
                account.photo = info[0].photo;
                console.log(account);
                getStats(account.account_id);
            }
        })
        .finally(function(){
            console.log(account);
        })
        .catch(function (err) {
    
    });
    return account;

}

export function callRegisterAccount(email, username, password) {
    account = {
        account_id: -1,
        display_name: "",
        user_email: "",
        password: "",
        photo: -1
    };
    var options = {
        method: 'POST',
        headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
        url: 'https://9x38qblue2.execute-api.us-east-1.amazonaws.com/dev/signup',
        body: JSON.stringify( {
        "dispName": username,
        "email": email,
        "pw": password
        })
    };

    rp(options)
        .then(function(acc){
            console.log(acc);
            var info = JSON.parse(acc);
            account.account_id = info[0].account_id;
            account.display_name = info[0].display_name;
            account.user_email = info[0].user_email;
            account.password = info[0].password;
            account.photo = info[0].photo;
            getStats(account.account_id);
            console.log(account);
        })
        .finally(function(){
            console.log(account);
        })
        .catch(function (err) {

    });
    return account;
}

export function updateStats(avgWPM, topWPM, letterMisses, totalWords, totalTime, id) {
    var options = {
        method: 'POST',
        headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
        url: 'https://9x38qblue2.execute-api.us-east-1.amazonaws.com/dev/updatestats',
        body: JSON.stringify( {
            "accID": id,
            "avgWPM": avgWPM,
            "topWPM": topWPM,
            "letterMisses": letterMisses,
            "totalWords": totalWords,
            "totalTime": totalTime
        })
    };

    rp(options)
        .then(function(res){
            console.log(res);
            // var info = JSON.parse(acc);
            // account.account_id = info[0].account_id;
            // account.display_name = info[0].display_name;
            // account.user_email = info[0].user_email;
            // account.password = info[0].password;
            // account.photo = info[0].photo;
            // console.log(account);
        })
        .finally(function(){
            console.log(options);
        })
        .catch(function (err) {

    });
    return account;
}

export function getStats(id) {

    var options = {
        url: 'https://9x38qblue2.execute-api.us-east-1.amazonaws.com/dev/getstatbyid?accId=' + id
    };

    rp(options)
        .then(function(acc){
            console.log(acc);
            var info = JSON.parse(acc);
            account.avg_wpm = info[0].avg_wpm;
            account.top_wpm = info[0].top_wpm;
            account.letter_misses = info[0].letter_misses;
            account.total_words = info[0].total_words;
            account.total_time = info[0].total_time;
            console.log(account);
        
        })
        .finally(function(){
            console.log(account);
        })
        .catch(function (err) {
    
    });
    return account;
}