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