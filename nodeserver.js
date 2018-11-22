var http = require('http');
var express = require('express');
var app = express();
var server = http.Server(app);
var bodyParser = require('body-parser');
// var mongo = require('mongodb');
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var articleSchema = new Schema({
  title: {
    type: String,
    required: "Title Required"
  },
  content: {
    type: String
  }
});

var Article = mongoose.model('Article', articleSchema);

var db;
var db_url = "mongodb://"+process.env.IP+":27017";

// mongo.MongoClient.connect(db_url, {useNewUrlParser:true}, function(err, client){
//   if(err){
//     console.log('Coud not connect to MongoDB');
//   } else{
//     db = client.db('node-cw9');
//   }
// })


//CW9b
mongoose.connect(db_url+"/node-cw9");
mongoose.connection.on('error', function(){
  console.log('Could not connect to MongoDB');
});




// var save = function(form_data){
//   db.createCollection('articles', function(err, collection){
//   });
//   var collection = db.collection('articles');
//   collection.save(form_data);
// }
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(request,response){
  response.sendFile(__dirname+'/index.html');
});

app.get('/about', function(request,response){
  response.sendFile(__dirname+'/about.html');
});

app.get('/new-article', function(request,response){
  response.sendFile(__dirname+'/form.html');
});
var article = [];
app.post('/article/create', function(request,response){
  var new_article = new Article(request.body);
  new_article.save(function(err,data){
    if(err)
      return response.status(400).json({error: "Please add a title"});
    console.log(data);
    return response.status(200).json({message: "Article successfully created!"});
  });
});

app.get('/article/list', function(request, response){
  return response.status(200).json({article: article});
});


app.get('/article/:articleID', function(request, response){
  response.render(__dirname+'/article.ejs', {
    article: article[request.params.articleID]
  });
});

// var fs = require('fs');
//   var server = http.createServer(function(req, res){
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/html');
//     fs.readFile('index.html', function(err, data){
//         if(err){
//             return console.log("File read error");
//         }
//         res.end(data);
//     });
//     // res.end("Hello World!");
//   });

  server.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server running');
});