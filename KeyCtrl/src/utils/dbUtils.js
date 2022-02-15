//First Successful Connection/Query

var mysql = require('mysql');
var connection;
var loggedIn = false;
var currAccId;

export function initCon(){
  connection = mysql.createConnection({
    host     : 'typetest-db.cba2qmzidbbp.us-east-1.rds.amazonaws.com',
    user     : 'admin',
    password : 'typeTest123' 
  });
  connection.connect();
}

export function endConn(){
  connection.end();
}

export function getInfoById(accId){
  connection.query("SELECT * FROM typeTestdb.user_table WHERE account_id = ?", [accId], function (error, results) {
    if (error) throw error;
    console.log('Account Info for Account #' + accId +": ", results);
  });
}

export function signUp(dispName, email, pw){
  connection.query("INSERT INTO typeTestdb.user_table (display_name,user_email,password) VALUES (?,?,?);",[dispName, email, pw], function (error, results) {
    if (error) {
      console.log("Email already registered! Try logging in!");
    } else {
      console.log('Account Created');
    }
  });
}

export function logIn(email, pw){
  connection.query("SELECT * FROM typeTestdb.user_table WHERE user_email = ? AND password = ?;", [email, pw], function (error, results) {
    if (error) throw error;
    console.log('Account #' + results[0].account_id + ' Logged In');
    currAccId = results[0].account_id;
    loggedIn = true;
  });
}
// initCon();

// //getInfoById('2');
// signUp('ccc','test4@website.com', '1111');
// logIn('test2', '5678');
// endConn();
