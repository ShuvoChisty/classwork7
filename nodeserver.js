var http = require('http');
var express=require('express');
var app=express();
var server =http.Server(app);
app.get('/',function(request, response){
    response.sendFile(__dirname+'/index.html');
});
app.get('/about',function(request, response){
    response.sendFile(__dirname+'/about.html');
});
  server.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server running');
});


 /*var fs = require('fs');
 
  var server = http.createServer(function(req, res)
  {
    res.statusCode = 300;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end("Hello World\n");
    
        res.setHeader('Content-Type', 'text/html');
        fs.readFile('index.html', function(err, data){
        
        if(err)
        {
            return console.log('File Read Error!');
        }
        
        res.end(data);
        
        });
        
  });*/
