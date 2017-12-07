var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('public'));
/* app.get('/', function(req, res){
  res.sendfile('./public/index.html');
  res.sendfile('./public/css/style.css');
  res.sendfile('./public/js/app.js');
}); */

// https://socket.io/
var numUsers = 0;

var rooms = ['Main Lobby','Room 1','Room 2','Room 3'];

var data = [];

//connect to mysql
var mysql = require('mysql');

var con = mysql.createConnection({	//connect to localhost as root
  host: "localhost",
  user: "root",
  password: ""
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

io.on('connection', function(socket){
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.to(socket.room).emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    if (addedUser) return;
	socket.room = 'Main Lobby';
    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined the chat', {
      username: socket.username,
      numUsers: numUsers
    });
	socket.emit('updaterooms', rooms, 'Main Lobby');
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.to(socket.room).emit('typing', {
      username: socket.username
    });
  });
  
  socket.on('switchRoom', function(newroom){
		socket.leave(socket.room);
		socket.join(newroom);
		socket.emit('updateUser' , 'You have connected to '+ newroom +".");
		// sent message to OLD room
		socket.broadcast.to(socket.room).emit('updateUser' , socket.username+' has left this room.');
		// update socket session room title
		socket.room = newroom;
		socket.broadcast.to(newroom).emit('updateUser' , socket.username+' has joined this room.');
		socket.emit('updaterooms', rooms, newroom);
	});
	

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.to(socket.room).emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
	  socket.leave(socket.room);
    }
  });
  
		// MySQL messages
  	//fetch assets (not emotes)
 /*  socket.on('fetchpart', function(type, num){
	var sql = "select path from "+type+"features where "+type+"ID = "+num;
	con.query(sql, function(err, result){
		if (err) throw err;
	});
	//push data to socket
  }); */
});

http.listen(80, function(){
  console.log('listening on *:80');
});
