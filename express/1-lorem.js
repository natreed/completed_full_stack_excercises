'use strict';

var express = require('express'); // do not change this line

// http://localhost:8080/lorem should return '<!DOCTYPE html><html><body>lorem ipsum</body></html>' as html

var server = express();

server.get('/', function(req, res) {
    res.status(200);

    res.set({
        'Content-Type': 'text/plain'
    });

    
})