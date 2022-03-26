const request = require('postman-request');
const rp = require('request-promise');

export function callLogin(email, photoUrl, name) {
    var account = {
        account_id: -1,
        display_name: name,
        user_email: "",
        photo: photoUrl
    };
    console.log(email)

    var options = {
        url: 'https://9x38qblue2.execute-api.us-east-1.amazonaws.com/dev/login?email='
        + email
    };

    return rp(options)
        .then(function(acc){
            console.log(acc);
            if(acc != "Fail"){//instead of invalid, "does not exist"
                return JSON.parse(acc)[0];
            }else{ 
                return callRegisterAccount(email, photoUrl);// if it returns invalid login recentials, it registers the account
            }
        })
        .finally(function(){
            console.log(account);
        })
        .catch(function (err) {
    
    });
}

export function callRegisterAccount(email, photoUrl) {
    var account = {
        account_id: -1,
        display_name: "",
        user_email: "",
        photo: photoUrl
    };
    var options = {
        method: 'POST',
        headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
        url: 'https://9x38qblue2.execute-api.us-east-1.amazonaws.com/dev/signup',
        body: JSON.stringify( {
        "email": email,
        })
    };

    return rp(options)
        .then(function(acc){
            console.log(acc);
            return JSON.parse(acc)[0];

        })
        .finally(function(){
            console.log(account);
        })
        .catch(function (err) {

    });
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
    // return account;
}

export function getStats(id) {

    var options = {
        url: 'https://9x38qblue2.execute-api.us-east-1.amazonaws.com/dev/getstatbyid?userId=' + id
    };

    return rp(options)
        .then(function(acc){
            console.log(acc);
            return JSON.parse(acc);
        })
        .finally(function(){
        })
        .catch(function (err) {
    });
}