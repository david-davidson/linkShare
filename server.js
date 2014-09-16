'use strict';

var express,
	http,
	fs,
	bodyparser,
	mongoose,
	passport,
	app,
	port,
	server,
	jwtAuth,
	options;

// Dependencies
express = require('express');
http = require('http');
bodyparser = require('body-parser');
mongoose = require('mongoose');
passport = require('passport');

app = express();

// Set Mongo URLs
mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGO_URL || 'mongodb://localhost/links');

// Specify the static directory
app.use(express.static(__dirname + (process.env.STATIC_DIR || '/dist')));

// Auth:
app.set('jwtTokenSecret', process.env.JWT_SECRET || 'changeMeChangeMeChangeMe');
app.set('secret', process.env.SECRET || 'changeMeChangeMeChangeMe'); // We never actually use this; passport just requires it

app.use(passport.initialize());
require('./lib/passport')(passport);



// Routing
app.use(bodyparser.json());
jwtAuth = require('./lib/jwtAuth')(app);

require('./userRouter')(app, passport);
require('./expressRouter')(app, jwtAuth.auth); // Note that we pass in only the function!

// Init
server = http.createServer(app);

port = process.env.PORT || 3000;

server.listen(port, function() {
	console.log('Lookin legit on port %d', port);
});

exports.port = port;