'use strict';

var http = require('http'); // do not change this line

var server = http.createServer(function (req, res) {
    var url = req.url;
    var cookie = req.headers.cookie;
    var name = cookie.split("; ident=");
    var msg = "ident=" + url

    if (name.length==2) {

        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Set-Cookie': msg
        });

        name = name[1].split(';').pop();
        var s = 'last time you visited ' + name;
        res.end(s);
    }
    else {
        var url = req.url;
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Set-Cookie': msg
        });
        res.end('you must be new');
    }

});

server.listen(process.env.PORT || 8080);
// http://localhost:8080/hello should return 'you must be new' in plain text and set an ident cookie

// http://localhost:8080/test should return 'last time you visited "/hello"' in plain text

// http://localhost:8080/world should return 'last time you visited "/test"' in plain text

// [now sending requests from a different browser]

// http://localhost:8080/lorem should return 'you must be new' in plain text and set an ident cookie

// http://localhost:8080/moshimoshi should return 'last time you visited "/lorem"' in plain text

// http://localhost:8080/ipsum should return 'last time you visited "/moshimoshi"' in plain text

// [sending requests from the original browser again]

// http://localhost:8080/again should return 'last time you visited "/world"' in plain text

// [the server restarts and looses all cookies]

// http://localhost:8080/servus should return 'you must be new' in plain text and set an ident cookie