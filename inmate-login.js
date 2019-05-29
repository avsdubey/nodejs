var express = require('express');
var mysql = require('mysql');

var bodyParser = require('body-parser');
var app = express();

//Third-party middelware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
var con = mysql.createConnection({
host     : 'atlodbadmin.cmj3xxz55qa7.us-east-2.rds.amazonaws.com',
user     : 'atlodbadmin',
password : 'Atlo$2019',
database : 'atlolibdb'
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on http://localhost:' + port);

app.post('/login_inmate', function (req, res)
{
	var input = JSON.parse(JSON.stringify(req.body));
   var last_name= input.last_name;
   console.log('The solution is: '+ req.body);
 
   console.log('The solution is: '+  input.last_name);
   console.log('The solution is: '+ req.body.last_name);
   console.log('The solution is: '+ req.params.last_name);
   con.query('SELECT * FROM inmate WHERE last_name = ?',[last_name], function (error, results, fields)
   {
       if (error)
       {
           res.send({"code":400,
                     "failed":"error ocurred"
                   })
       }
       else
       {
       // console.log('The solution is: ', results);
           if(results.length >0)
           {
               res.send({"status":200,
                         "success": "true",
                         "message": "Loged in successfully!"
                       });
           }
           else
           {
               res.send({"code":204,
                         "failed":"false",
						 "message": "User not exist"
                       });
           }
       }
  });
});

app.post('/add_question', function (req, res)
{
   var input = JSON.parse(JSON.stringify(req.body));
   
   var data = {
     question_id: input.question_id,
     question_desc: input.question_desc
   };
   var query = con.query("INSERT INTO question set ?", data, function(err, rows, fields){
     if(err)
       console.log("Error in Inserting Data : %s", err);
     else{
       var query = con.query("SELECT * FROM question WHERE question_id = ?", rows.insertId, function(err, rows){
         if(err) console.log("Error Editing list : %s", err);
         res.send({"status":200,
                         "success": "true",
                         "message": "Loged in successfully!",
                          "result": rows
                       });
       });

     }
   });
});