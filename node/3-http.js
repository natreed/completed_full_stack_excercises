'use strict';

var http = require('http'); // do not change this line
//const NodeCache = require( "node-cache" );



var server = http.createServer(function (req, res) {
    if (req.url === '/missing') {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.end('your princess is in another castle');

    }
    else if (req.url === '/redirect') {
        res.writeHead(302, {
            'Content-Type': 'text/plain',
            'location': '/redirected'

        });

        res.end()
    }
    else if (req.url === '/cache') {
        res.setHeader('Cache-Control', 'max-age=86400');

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('cache this resource');
    }
    else if (req.url === '/cookie') {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Set-Cookie': 'hello=world'
        });

        res.end('i gave you a cookie');
    }
    else if (req.url === '/check') {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
        });

        var cookies = req.headers.cookie;
        var s = '';
        if (cookies.indexOf('hello=world') >= 0) {
            s = 'yes';
        }
        else {
            s = 'no';
        }
        res.end(s);
    }
    else {
        res.end();
    }
});

server.listen(process.env.PORT || 8080);
// http://localhost:8080/missing should return a status code 404 with 'your princess is in another castle' in plain text

// http://localhost:8080/redirect should redirect the request to '/redirected' by using 302 as the status code

// http://localhost:8080/cache should return 'cache this resource' in plain text and set the cache max age to a day

// http://localhost:8080/cookie should return 'i gave you a cookie' in plain text and set 'hello=world' as a cookie

// http://localhost:8080/check should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie