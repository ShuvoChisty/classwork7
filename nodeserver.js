var http = require('http');
var express = require('express');
var app = express();
var server = http.Server(app);
var bodyParser = require('body-parser');
var mongo = require('mongodb');

var db;
var db_url = "mongodb://"+process.env.IP+":27017";
mongo.MongoClient.connect(db_url, {useNewUrlParser:true}, function(err, client){
  if(err){
    console.log('Coud not connect to MongoDB');
  } else{
    db = client.db('node-cw9');
  }
})


var save = function(form_data){
  db.createCollection('articles', function(err, collection){
    
  });
  var collection = db.collection('articles');
  collection.save(form_data);
}
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
  console.log(request.body);
  if(!request.body.title){
    return response.status(400).json({error: "Please add a title"}); 
  }
  // article.push(request.body);
  save(request.body);
  return response.status(200).json({message: "Article successfully created!"});
});

// article.push({title:"Test 1", content:"YOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO1"});
// article.push({title:"Test 2", content:"YOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO2"});

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