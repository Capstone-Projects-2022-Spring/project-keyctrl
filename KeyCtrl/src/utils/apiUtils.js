const request = require('postman-request');
const rp = require('request-promise');

export function callLogin(email, photoUrl, name) {

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
                return -1// if it returns invalid login recentials, it registers the account
            }
        })
        .finally(function(){
        })
        .catch(function (err) {
    
    });
}

export function callRegisterAccount(email, photoUrl, name, socialId) {

    var options = {
        method: 'POST',
        headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
        url: 'https://9x38qblue2.execute-api.us-east-1.amazonaws.com/dev/signup',
        body: JSON.stringify( {
        "email": email,
        "pic": photoUrl,
        "dName": name,
        "sId": socialId
        })
    };

    return rp(options)
        .then(function(acc){
            console.log(acc);
            return JSON.parse(acc)[0];
        })
        .finally(function(){
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
export function callAddFriend(AccountId, socialId) {
    
    var options = {
        method: 'POST',
        headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
        url: 'https://9x38qblue2.execute-api.us-east-1.amazonaws.com/dev/addfriend',
        body: JSON.stringify( {
        "userId": AccountId,
        "socialId":socialId
        })
    };

    return rp(options)
        .then(function(res){
            console.log(res);
            if(res == 'Unable to add friend, user not found')
            {
                alert('Unable to add friend, user not found')
            }
            return res
        })
           
}

export function getFriends(id, socialId) {

    var options = {
        url: 'https://9x38qblue2.execute-api.us-east-1.amazonaws.com/dev/updatefriends?userId='
         + id + "&socialId=" + socialId
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

export function respondToRequest(requestId, resp) {
    
    var options = {
        method: 'POST',
        headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
        url: 'https://9x38qblue2.execute-api.us-east-1.amazonaws.com/dev/resolvereq',
        body: JSON.stringify( {
        "reqId": requestId,
        "reqRes": resp
        })
    };

    return rp(options)
        .then(function(res){
            console.log(res);
            return res
        })
           
}

export function deleteAccount(id) {

    var options = {
        url: 'https://9x38qblue2.execute-api.us-east-1.amazonaws.com/dev/deleteaccount?userId=' + id
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

export function removeFriend(account_id, social_id, friend_name ) {
    
    var options = {
        method: 'POST',
        headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
        url: 'https://9x38qblue2.execute-api.us-east-1.amazonaws.com/dev/removefriend',
        body: JSON.stringify( {
        "userId": account_id,
        "socialId": social_id,
        "friendId": friend_name
        })
    };

    return rp(options)
        .then(function(res){
            console.log("removeFriend", res);
            return res
        })
           
}

export function updateOptions(account_id, theme) {
    
    var options = {
        method: 'POST',
        headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
        url: 'https://9x38qblue2.execute-api.us-east-1.amazonaws.com/dev/updateoptions',
        body: JSON.stringify( {
        "userId": account_id,
        "theme": theme,
        })
    };

    return rp(options)
        .then(function(res){
            console.log("updateOptions", res);
            return res
        })
           
}