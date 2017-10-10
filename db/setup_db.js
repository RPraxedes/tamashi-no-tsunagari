var mysql = require('mysql');

//connect to localhost and database
var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
  database: "tamashi"
});

//establish connection
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//table for users' username and password
var sql = "CREATE TABLE users (userID INT AUTO_INCREMENT, username VARCHAR(30), password VARCHAR(30), tstamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(userID))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table users created");
  });

//table for facetype (includes hair)
sql = "CREATE TABLE facefeatures (faceID INT AUTO_INCREMENT, path VARCHAR(255), tstamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(faceID))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table facefeatures created");
  });

//table for body type
sql = "CREATE TABLE bodyfeatures (bodyID INT AUTO_INCREMENT, path VARCHAR(255), tstamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(bodyID))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table bodyfeatures created");
  });  
 
//table for costume type (based on body)
sql = "CREATE TABLE costumefeatures (cosID INT AUTO_INCREMENT, bodyID INT REFERENCES bodyfeatures(bodyID), userID INT REFERENCES users(userID), tstamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(cosID))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table costumefeatures created");
  });

//table for characters created
sql = "CREATE TABLE characters (charID INT AUTO_INCREMENT, userID INT REFERENCES users(userID), faceID INT REFERENCES facefeatures(faceID) , bodyID INT REFERENCES bodyfeatures(bodyID) ,cosID INT REFERENCES costumefeatures(cosID), tstamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(charID))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table characters created");
  });

//table for backgrounds (chat background)
sql = "CREATE TABLE background (bgID INT AUTO_INCREMENT, path VARCHAR(255), tstamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(bgID))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table background created");
  });

//table for lobbies
sql = "CREATE TABLE lobby (lobbyID INT AUTO_INCREMENT, lobbyname VARCHAR(30), lobbypass VARCHAR(30), status VARCHAR(30), bgID INT REFERENCES background(bgID), tstamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(lobbyID))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table lobby created");
  });

//table for users inside lobby
sql = "CREATE TABLE user_in_lobby (userID INT REFERENCES users(userID), lobbyID INT references lobby(lobbyID), tstamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table user_in_lobby created");
  });

//table for emotes
sql = "CREATE TABLE emotion (emoteID INT AUTO_INCREMENT, faceID INT REFERENCES facefeatures(faceID), path VARCHAR(255), tstamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(emoteID))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table emotion created");
  });  

//table for chat history
sql = "CREATE TABLE chat (chatID INT AUTO_INCREMENT, lobbyID INT references lobby(lobbyID), userID INT REFERENCES users(userID), message VARCHAR(255), emoteID INT REFERENCES emotion(emoteID), tstamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(chatID))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table chat created");
  });
  
con.end();
