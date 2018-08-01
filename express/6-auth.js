'use strict';

var express = require('express'); // do not change this line
var passport = require('passport'); // do not change this line
var Strategy = require('passport-http').BasicStrategy;// do not change this line
var db = require('./db');


/**
 * Much of this is derived directly from jaredhanson's github: passport
 * https://github.com/passport/express-3.x-http-basic-example/blob/master/
 * @type {*[]}
 */
passport.use(new Strategy(
    function(username, password, cb) {
        console.log("inside strategy");
        db.users.findByUsername(username, function(err, user) {
            console.log("inside findByUsername");
            if (err) { return cb(err); }

            if (!user) {
                console.log("no username");
                return cb(null, false);
            }
            if (user.password != password) {
                console.log("password: " + user.password)
                return cb(null, false);
            }
            else {
                console.log("password: " + user.password + " user: " + user.username);
            }
            return cb(null, user);
        });
    }));


//Create new express server.
var server = express();

server.get('/hello', function(req, res) {
    res.status(200);
    res.set({'Content-Type': 'text/plain'});

    res.send('accessible to everyone');
});

server.get('/*',
    passport.authenticate('basic', { session: false}),
    function(req, res) {
        console.log("after auth");
        res.status(200);
        res.set({'Content-Type': 'text/plain'});
        res.send('only accessible when logged in');
    });

server.listen(process.env.PORT || 8080);




// preface: use the passport middleware and only grant the user "test" with the password "logmein" access

// note: should the server restart, the browser will still technically be logged in since we are using the http basic access authentication which lets the browser submit the username and the password at each request

// http://localhost:8080/hello should return 'accessible to everyone' in plain text

// http://localhost:8080/world should return 'only accessible when logged in' in plain text if user the user is authenticate, otherwise will prompt for the username and password

// http://localhost:8080/test should return 'only accessible when logged in' in plain text if user the user is authenticate, otherwise will prompt for the username and password