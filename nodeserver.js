var http = require('http');
var express = require('express');
var app = express();
var server = http.Server(app);
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

// var Article = require('./models/article.js');

var db;
var db_url = "mongodb://"+process.env.IP+":27017";

//CW9b
mongoose.connect(db_url+"/node-cw9");
mongoose.connection.on('error', function(){
  console.log('Could not connect to MongoDB');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(request,response){
  response.render('index.ejs');
});

app.get('/about', function(request,response){
  response.sendFile('about.ejs');
});

require('./routes/article-routes.js')(app);

server.listen(process.env.PORT, process.env.IP, function(){
  console.log('Server running');
});