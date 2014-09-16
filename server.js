'use strict';

var express,
	http,
	bodyparser,
	mongoose,
	passport,
	app,
	port,
	server,
	jwtAuth;

express = require('express');
http = require('http');
bodyparser = require('body-parser');
mongoose = require('mongoose');
passport = require('passport');

app = express();
port = process.env.PORT || 3000;

// Set Mongo URLs
mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGO_URL || 'mongodb://localhost/links');

// Specify the static directory
app.use(express.static(__dirname + (process.env.STATIC_DIR || '/dist')));

// Set the JWT secret
app.set('jwtTokenSecret', process.env.JWT_SECRET || 'devSecret');
app.set('secret', process.env.SECRET || 'devSecret'); // We never actually use this; passport just requires it

// Initialize passport
app.use(passport.initialize());

require('./lib/passport')(passport);
jwtAuth = require('./lib/jwtAuth')(app);

app.use(bodyparser.json());

// Routing
require('./userRouter')(app, passport);
require('./expressRouter')(app, jwtAuth.auth);

// Init
server = http.createServer(app);

server.listen(port, function() {
	console.log('Lookin legit on port %d', port);
});

exports.port = port;