var express = require('express');
var app = express();
var fs = require('fs');
var template = require('./lib/template.js');

// app.get('/', (req, res) => res.send('Hello World'));
app.get('/', function(request, response) {
    fs.readdir('./data', function(error, filelist){
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var list = template.list(filelist);
        var html = template.HTML(title, list,
          `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>`
        );
        // response.writeHead(200);
        // response.end(html);
        response.send(html); // 위의 두줄과 같다.
      });
});

// URL path를 통하여 parameter 전달
app.get('/page/:pageId', function(request, response) {
    response.send(request.params);
});

// app.listen(3000, () => console.log('Example app listening on port 3000!'));
app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});