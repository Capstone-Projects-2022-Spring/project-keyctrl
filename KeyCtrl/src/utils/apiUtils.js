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

    console.log(options)
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

export function updateStats(gamemode, stats) {
    stats["gamemode"] = gamemode
    console.log(stats)
    var options = {
        method: 'POST',
        headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
        url: 'https://9x38qblue2.execute-api.us-east-1.amazonaws.com/dev/updatestats',
        body: JSON.stringify(stats)
    };

   return rp(options)
        .then(function(res){
            console.log(res);
            return res
        })
        .finally(function(){
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

export function insertHistory(account_id, stat, value, gamemode ) {
   
    var options = {
        method: 'POST',
        headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
        url: ' https://9x38qblue2.execute-api.us-east-1.amazonaws.com/dev/inserthistory',
        body: JSON.stringify( {
        "userId": account_id,
        "stat": stat,
        "value": value,
        "gamemode": gamemode
        })
    };

    return rp(options)
        .then(function(res){
            console.log("insertHistory", res);
            return res
        })
           
}

export function changeUsername(account_id, social_id, display_name ) {
   
    var options = {
        method: 'POST',
        headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
        url: 'https://9x38qblue2.execute-api.us-east-1.amazonaws.com/dev/updatedispname',
        body: JSON.stringify( {
        "userId": account_id,
        "socialId": social_id,
        "displayName": display_name
        })
    };

    return rp(options)
        .then(function(res){
            console.log("changeUsername", res);
            return res
        })    
}

export function updateMMR(account_id, mmr) {
   
    var options = {
        method: 'POST',
        headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
        url: 'https://9x38qblue2.execute-api.us-east-1.amazonaws.com/dev/updatemmr',
        body: JSON.stringify( {
        "userId": account_id,
        "mmr": mmr
        })
    };

    return rp(options)
        .then(function(res){
            console.log("updateMMR", res);
            return res
        })    
}



