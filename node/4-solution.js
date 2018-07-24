'use strict';

var http = require('http'); // do not change this line

var strHistory = {};

var server = http.createServer(function(req, res) {
    var strCookies = req.headers.cookie || '';
    var strIdent = '';

    if (strCookies.indexOf('strIdent=') !== -1) {
        strIdent = strCookies.split('strIdent=')[1].split(';')[0]; // crappy solution
    }

    if (strIdent === '') {
        strIdent = String(Math.round(Math.random() * 1000000));

    } else if (strHistory.hasOwnProperty(strIdent) === false) {
        strIdent = String(Math.round(Math.random() * 1000000));

    }

    if (strHistory.hasOwnProperty(strIdent) === false) {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Set-Cookie': 'strIdent=' + strIdent
        });

        res.write('you must be new');

        res.end();

    } else if (strHistory.hasOwnProperty(strIdent) === true) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.write('last time you visited "' + strHistory[strIdent] + '"');

        res.end();

    }

    strHistory[strIdent] = req.url;
});

server.listen(process.env.PORT || 8080);