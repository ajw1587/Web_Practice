var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request, response)
{
    var _url = request.url;
    var queryData = url.parse(_url, ture).query;
    var pathname = url.parse(_url, true).pathname;

    console.log(url.parse(_url,true));
    console.log(url.parse(_url, treu).id);
    console.log(url.parse(_url, treu).pathname);

    if(pathname = '/')
    {
        if(queryData.id === undefined)
        {
            fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description)
            {
                var titile = 'Welcome';
                var description = 'Hello, Node.js';
                var template = `
                <!doctype html>
                <html>
                <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1><a href="/">WEB</a></h1>
                    <ul>
                        <li><a href="/?id=HTML">HTML</a></li>
                        <li><a href="/?id=CSS">CSS</a></li>
                        <li><a href="/?id=JavaScript">JavaScript</a></li>
                    </ul>
                    <h2>${titile}</h2>
                    <p>${description}</p>
                </body>
                </html>
                `;
                response.writeHead(200);        // 파일을 성공적으로 전송했다.
                response.end(template);
            });
        } else
        {
            fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description)
            {
                var title = queryData.id;
                var template = `
                <!doctype html>
                <html>
                <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1><a href="/">WEB</a></h1>
                    <ul>
                        <li><a href="/?id=HTML">HTML</a></li>
                        <li><a href="/?id=CSS">CSS</a></li>
                        <li><a href="/?id=JavaScript">JavaScript</a></li>
                    </ul>
                    <h2>${titile}</h2>
                    <p>${description}</p>
                </body>
                </html>
                `;
                response.writeHead(200);        // 파일을 성공적으로 전송했다.
                response.end(template);
            });
        }
    }
    else
    {
        response.writeHead(404);
        response.end('Not found');
    }

});
app.listen(3000);