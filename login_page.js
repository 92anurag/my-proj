var express = require('express');
var bodyparser = require('body-parser');
var app = express();

app.use(bodyparser.urlencoded({ extended: true }));
z


app.get('/',function(req,res){
	res.sendfile('./login_page.html');
});



var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'anurag92',
  database : 'form'
});





//tech crunch


app.post('/submit',function(req,res){
	var userid = req.body.user_id.toString();
	var passw = req.body.password.toString();
	var ip = {id: null, user_name : userid, password : passw};
	console.log(userid + " " + passw);
	connection.connect();
	//connection.query('Insert into information (`id`,`user_name`,`password`) values (null,userid,passw)' , 
	connection.query('Insert into information set ?', ip , 
	function(err, rows, fields) {
		console.log("done",err);
	});
	connection.end();
	res.end();
});


app.listen(3000);
