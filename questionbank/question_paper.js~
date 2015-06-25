var express = require('express');
var fs=require("fs");
var app = express();


// to convert html to pdf 
var exec = require('child_process').exec;
// body parser needed in case of post 
var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended : false}));



// function to get random number in the range of {min,max}
var randomInt = function(min,max){
	return Math.floor(Math.random() * (max - min)) + min;
}


// connect it to mysql database 
var mysql=require('mysql'); 
var connection=mysql.createConnection({
	host	 : 'localhost',
	user	 : 'root',
	password : 'anurag92',
	database : 'question'
});

app.get('/',function(req,res){
	res.sendfile('./question_paper_html.html');
});

app.post('/hello',function(req,res){
	var ins = req.body.ins;
	var gen = req.body.gen;
	console.log(ins + " "+ gen);
	if(ins)
		res.sendfile('login_page.html'); // create a new html file to handle this
	else
		res.sendfile('generate_html.html');
});


app.post('/submit',function(req,res){
	var n = 10//req.body.question; // total no of questions
	var t = req.body.duration;
	connection.connect();
    var html="";
	connection.query('select distinct id,time from table1 where time between 7 and 8 order by RAND() limit 3',function(err,rows,fields){
		
	    if(!err)
	   	{
	   		for(var i=0;i<rows.length;i++){
	        	html=html+rows[i].id+" ";
	        }
			connection.query('select distinct id,time from table1 where time between 5 and 6 order by RAND() limit 4',function(err1,rows1,fields1){
				console.log(err1);	
	
				if(!err1){
					for(var i=0;i<rows1.length;i++){
		            	html=html+rows1[i].id+" ";
		        	}
        
            		connection.query('select distinct id,time from table1 where time between 3 and 4 order by RAND() limit 3',function(err2,rows2,fields2){	
	
			            if(!err2){
			            	for(var i=0;i<rows2.length;i++){
			            		html=html+rows2[i].id+" ";
			           		}
		                	//res.send(html);
		                	//res.download('hello.html');
		                	fs.writeFile("paper.html",html, function(err) {
								if(!err) { 
									console.log("file saved to site.html");
									var child = exec("wkhtmltopdf --ignore-load-errors " + "paper.html" + " " + "paper.pdf", function(err, stdout, stderr) {
									if(err) { throw err; }
									console.log(stderr);
		     						});
								}
								else
	  								throw err;
							});
							//res.sendfile('./paper.pdf');
							res.download('./paper.pdf');
							// now give a download button 
		                	connection.end();
	        			}

    				});
				}	
			});
		}
	});	
});




app.listen(3000);
