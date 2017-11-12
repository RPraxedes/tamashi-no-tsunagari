var mysql = require('mysql');

//connect to localhost and database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tamashi"
});

//establish connection
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

/* seed values to db ONLY. DOES NOT CLEAR TABLES. */

	//faces
sql = "INSERT INTO facefeatures VALUES (null, '../assets/img/char/face_1_1.png', null)";
con.query(sql, function (err, result) {
	if (err) throw err;
});

sql = "INSERT INTO facefeatures VALUES (null, '../assets/img/char/face_1_2.png', null)";
con.query(sql, function (err, result) {
	if (err) throw err;
});

sql = "INSERT INTO facefeatures VALUES (null, '../assets/img/char/face_1_3.png', null)";
con.query(sql, function (err, result) {
	if (err) throw err;
});

sql = "INSERT INTO facefeatures VALUES (null, '../assets/img/char/face_1_4.png', null)";
con.query(sql, function (err, result) {
	if (err) throw err;
});

	//body
sql = "INSERT INTO bodyfeatures VALUES (null, '../assets/img/char/body_1_1.png', null)";
con.query(sql, function (err, result) {
	if (err) throw err;
});

sql = "INSERT INTO bodyfeatures VALUES (null, '../assets/img/char/body_1_2.png', null)";
con.query(sql, function (err, result) {
	if (err) throw err;
});

sql = "INSERT INTO bodyfeatures VALUES (null, '../assets/img/char/body_1_3.png', null)";
con.query(sql, function (err, result) {
	if (err) throw err;
});

sql = "INSERT INTO bodyfeatures VALUES (null, '../assets/img/char/body_1_4.png', null)";
con.query(sql, function (err, result) {
	if (err) throw err;
});

	//expressions
sql = "INSERT INTO emotion VALUES (null, 1, '../assets/img/char/exp_1_1.png', null)";
con.query(sql, function (err, result) {
	if (err) throw err;
});

sql = "INSERT INTO emotion VALUES (null, 1, '../assets/img/char/exp_1_2.png', null)";
con.query(sql, function (err, result) {
	if (err) throw err;
});

sql = "INSERT INTO emotion VALUES (null, 1, '../assets/img/char/exp_1_3.png', null)";
con.query(sql, function (err, result) {
	if (err) throw err;
});

sql = "INSERT INTO emotion VALUES (null, 1, '../assets/img/char/exp_1_4.png', null)";
con.query(sql, function (err, result) {
	if (err) throw err;
});

sql = "INSERT INTO emotion VALUES (null, 1, '../assets/img/char/exp_1_5.png', null)";
con.query(sql, function (err, result) {
	if (err) throw err;
});

console.log('Seeding completed!');
con.end();