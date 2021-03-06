var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path')
var sanitizeHtml = require('sanitize-html');
var bodyParser = require('body-parser');
var template = require('./lib/template.js');
var qs = require('querystring');
var comporession = require('compression');

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

// app.get('/', (req, res) => res.send('Hello World'));
app.get('/', function (request, response) {
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(request.list);
    var html = template.HTML(title, list,
        `<h2>${title}</h2>${description}
        <img = src = "/images/hello.jpg" style = "width:300px; display:block; margin-top:10px;">
        `,
        `<a href="/create">create</a>`
    );
    // response.writeHead(200);
    // response.end(html);
    response.send(html); // 위의 두줄과 같다.
});

// URL path를 통하여 parameter 전달
app.get('/page/:pageId', function (request, response, next) {
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
        if(err){
            next(err);
        } else{
            var title = request.params.pageId;
            var sanitizedTitle = sanitizeHtml(title);
            var sanitizedDescription = sanitizeHtml(description, {
                allowedTags: ['h1']
            });
            var list = template.list(request.list);
            var html = template.HTML(sanitizedTitle, list,
                `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
                ` <a href="/create">create</a>
              <a href="/update/${sanitizedTitle}">update</a>
              <form action="/delete_process" method="post">
                <input type="hidden" name="id" value="${sanitizedTitle}">
                <input type="submit" value="delete">
              </form>`
            );
            // response.writeHead(200);
            // response.end(html);
            response.send(html);
        }
    });
});

app.get('/create', function (request, response) {
    var title = 'WEB - create';
    var list = template.list(request.list);
    var html = template.HTML(title, list, `
      <form action="/create_process" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
          <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
    `, '');
    response.send(html);
});

app.post('/create_process', function (request, response) {
    var post = request.body;
    var title = post.title;
    var description = post.description;
    fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
        response.writeHead(302, { Location: `/?id=${title}` });
        response.end();
    });
});

app.get('/update/:pageId', function (request, response) {
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
        var title = request.params.pageId;
        var list = template.list(filelist);
        var html = template.HTML(title, list,
            `
        <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
        );
        response.send(html);
    });
});

app.post('/update_process', function (request, response) {
    /*var body = '';
    request.on('data', function (data) {
      body = body + data;
    });
    request.on('end', function () {
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, function (error) {
        fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
          response.writeHead(302, { Location: `/?id=${title}` });
          response.end();
        });
      });
    });*/
    var body = request.body;
    var id = post.id;
    var title = body.title;
    var description = body.description;
    fs.rename(`data/${id}`, `data/${title}`, function (error) {
        fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
            response.redirect('/?id=${title}');
        });
    });
});

app.post('/delete_process', function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        var id = post.id;
        console.log(id);
        var filteredId = path.parse(id).base;
        console.log(filteredId);
        fs.unlink(`data/${filteredId}`, function (error) {
            // response.writeHead(302, {Location: `/`});
            // response.end();
            response.redirect('/');
        });
    });
});

app.use(function(req, res, next) {
    res.status(404).send("Sorry cant find that");
});

app.use(function (err, req, res, next){
    console.error(err.stack);
    res.status(500).send('Something broke!')
})

// app.listen(3000, () => console.log('Example app listening on port 3000!'));
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});