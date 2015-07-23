// database.js 
var mysequel=require('mysequel'); 

var db = mysequel({
	url: 'mysql://root:anurag92@localhost/user_details',
	connections: {min:1 ,max: 20}
});


module.exports = db;




// query.js 
var db = require('./database');

var dboperations = {

	table : db.define({
		name : 'profile',
		columns : ['id','hobbies','workex','education','pic','email']
	}), 
	sel : function(options,cb){
		var tbl = this.table;
		var qi = tbl.select(options.sel);
		qi = qi.from (tbl);
		qi = qi.where(tbl.email.equals(options.email));
		console.log(qi.toQuery().text);
		qi.exec(cb);
	},
	/*sel : function(id){
		var qi = this.table.select();
		var filter=[]; 
		var arr = [1,3,4];
		filter.push(this.table.id.in(id));
		//filter.push(this.table.hobbies.equals('cs'));
		//for(var i=0;i<filter.length;i++)
			//fi.push(this.table.id.in(filter[i]));
		qi=qi.where.apply(qi,filter);
		console.log(qi.toQuery().text);
		qi.exec(func);
		function func(err,rows){
			var pic = rows[0].pic;
			var hobbies = rows[0].hobbies;
			var education = rows[0].education;
			var workex = rows[0].workex;
			console.log(rows);
		}
	},*/
	ins : function(options , cb){
		var tbl = this.table;
		var qi = tbl.insert(options.sel);
		console.log(qi);
		qi.exec(cb);
	},
	update: function(options , cb){
		var tbl =this.table;
		var qi = tbl.update(options.col);
		qi.where(tbl.id.equals(options.id));
		console.log(qi.toQuery().text);
		qi.exec(cb);
	}
}


module.exports = dboperations;




// join operations 
var temp = {

table: db1.define({
    name: 'sales_order_fulfillment',
    columns: ['id', 'order_id', 'status', 'shipper_id', 'tracking_number',
      'created_at', 'shipped_at', 'delivered_at'
    ]
  }),
  table1: db1.define({
    name: 'shippers',
    columns: ['id', 'name'
    ]
  }),
  getData: function(cb){
    var sof = this.table;
    var sh = this.table1;
    var qi = sof.select(sh.name , sh.id , sof.status ,'count(*) as count');
    var statusCode = [7,15];
    qi = qi.from(sof.join(sh).on(sof.shipper_id.equals(sh.id)));
    qi = qi.where(sof.status.in(statusCode));
    qi = qi.group(sof.shipper_id,sof.status);
    console.log(qi.toQuery().text);
    qi.exec(cb);
  },


};






//..............................UNIT TEST .....................

if(require.main == module){
  (function () {
    // var options = {
    // 	sel : ['id','hobbies'],
    // 	email : 'anurag@gmail.com'
    // };
    // var options = {
    // 	sel : [{hobbies : "chess"}]
    // };
    var options = {
    	col : {email : 'anurag.singhal@paytm.com',hobbies: "jhkj"},
    	id : 7
    };
    // dboperations.sel(options,function(err,rows){
    // 	console.log(rows);
    // });
   // dboperations.ins(options,function(err,data){
   // 		console.log("done");
   // });
  dboperations.update(options,function(err,data){
   		console.log("done");
   });
  })();
}




