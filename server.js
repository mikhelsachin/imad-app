var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool=require('pg').pool;

var config={
    user:'mikhelsachin',
    database:'mikhelsachin',
    host:'db.imad.hasura.io',
    port:'5432',
    password:process.queryDB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
var pool=new pool(config);
app.get('/student',function(req,res) {
    //make a request
    //get response from our database
    pool.query('SELECT * FROM student',function(err,res) {
             if(err)
             {
           res.status(500).send(err.toString());
               }
        else{
            res.send(JSON.stringify(res));
        }
    
    });
    
    
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
