var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var template = require('./lib/template.js');
var qs = require('querystring');
var compression = require('compression');
var topicRouter = require('./routes/topic');

app.use(express.static('public'));
// localhost:3000/images/hello.jpg 에 접속 가능!
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression()); // 압축을 통해 용량을 절약한다!
/*
app.use(function (request, response, next) {
    fs.readdir('./data', function (error, filelist) {
        request.list = filelist;
        next();
    });
});*/
// get 방식에서만 사용
app.get('*', function(request, response, next){
    fs.readdir('./data', function(error, filelist){
        request.list = filelist;
        next();
    });
});

app.use('/topic', topicRouter);

// app.get('/', (req, res) => res.send('Hello World'));
app.get('/', function (request, response) {
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(request.list);
    var html = template.HTML(title, list,
        `
        <h2>${title}</h2>${description}
        <img = src = "/images/hello.jpg" style = "width:300px; display:block; margin-top:10px;">
        `,
        `<a href="/topic/create">create</a>`
    );
    response.send(html); // 위의 두줄과 같다.
});


app.use(function(req, res, next) {
    res.status(404).send("Sorry cant find that");
});

app.use(function (err, req, res, next){
    console.error(err.stack);
    res.status(500).send('Something broke!')
})

// app.listen(3000, () => console.log('Example app listening on port 3000!'));
app.listen(8000, function () {
    console.log('Example app listening on port 3000!');
});