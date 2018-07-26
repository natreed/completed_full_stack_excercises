'use strict';

var express = require('express'); // do not change this line
var passport = require('passport'); // do not change this line
var strategy = require('passport-http'); // do not change this line
var session = require('express-session');
express.use(session({secret: 'mySecretKey'}));
express.use(passport.initialize());
express.use(passport.session());

var server = express();

server.post('/test',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });

passport.use(new LocalStrategy({
        usernameField: 'test',
        passwordField: 'logmein',
        session: false
    },
    function(username, password, done) {
        // ...
    }
));

// preface: use the passport middleware and only grant the user "test" with the password "logmein" access

// note: should the server restart, the browser will still technically be logged in since we are using the http basic access authentication which lets the browser submit the username and the password at each request

// http://localhost:8080/hello should return 'accessible to everyone' in plain text

// http://localhost:8080/world should return 'only accessible when logged in' in plain text if user the user is authenticate, otherwise will prompt for the username and password

// http://localhost:8080/test should return 'only accessible when logged in' in plain text if user the user is authenticate, otherwise will prompt for the username and password