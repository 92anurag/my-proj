// this is used in this just to generate random numbers 
var randomInt = function(min,max){
	return Math.floor(Math.random() * (max - min)) + min;
}

// creating connection of expressjs to mysql
var mysql = require('mysql');
var connection =mysql.createConnection({
	host 	  : 'localhost',
	user      : 'root',
	password  : 'anurag92',
	database  : 'question'
});

connection.connect();

var b=function(ip,i){
	connection.query('Insert into table1 set ?',ip,function(){
		console.log(i);
	});
}


for(i=0;i<300;i++){
	var a = randomInt(3,9);
	var ip={id : null, time : a};
	b(ip,i);
}



connection.end();

console.log("done");