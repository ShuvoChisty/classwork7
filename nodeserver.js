var http = require('http');
var express=require('express');
var app=express();
var server=http.Server(app);
var bodyParser=require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(request, response){
  response.sendFile(__dirname+'/index.html');
});
app.get('/about',function(request, response){
  response.sendFile(__dirname+'/about.html');
});
app.get('/new-article',function(request, response){
  response.sendFile(__dirname+'/form.html');
});
 var article=[];
app.post('/articles/create',function(request, response){
    console.log(request.body);
    if(!request.body.title){
      return response.status(400).json({error: "Please add a title"});
    }
    article.push(request.body);
    response.status('200').json({message: "Article Successful"});
});
app.get('article/list', function(request, response){
    response.status('200').json({articles: "Article Successful"});
});
server.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log('Server running');
  });

/*var fs=require('fs');
  var server = http.createServer(function(req, res){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.readFile('index.html', function(err, data){
        if(err){
            return console.log("File read error");
        }
        res.end(data);
    })
    //res.end("Hello World\n");
  });
  server.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log('Server running');
  });*/
  
  

