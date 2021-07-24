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
            fs.readdir('./data', function(error, filelist)
            {
                console.log(filelist);
                var titile = 'Welcome';
                var description = 'Hello, Node.js';
                var list = '<ul>';
                var i = 0;
                while(i < filelist.length){
                    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
                    i = i + 1;
                }
                list = list + '</ul>';

                var template = `
                <!doctype html>
                <html>
                <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1><a href="/">WEB</a></h1>
                    ${list}
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
            fs.readdir('./data', function(error, filelist)
            {
                console.log(filelist);
                var titile = 'Welcome';
                var description = 'Hello, Node.js';
                var list = '<ul>';
                var i = 0;
                while(i < filelist.length){
                    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
                    i = i + 1;
                }
                list = list + '</ul>';
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
                        ${list}
                        <h2>${titile}</h2>
                        <p>${description}</p>
                    </body>
                    </html>
                    `;
                    response.writeHead(200);        // 파일을 성공적으로 전송했다.
                    response.end(template);
                });
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