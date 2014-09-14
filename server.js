'use strict';

var express = require('express'),
	http = require('http'),
	bodyparser = require('body-parser'),
	mongoose = require('mongoose'),
	app = express(),
	port = process.env.PORT || 3000,
	server;

mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGO_URL || 'mongodb://localhost/links');

app.use(express.static(__dirname + (process.env.STATIC_DIR || '/dist')));

app.use(bodyparser.json());

require('./expressRouter')(app);

server = http.createServer(app);

server.listen(port, function() {
	console.log('Lookin legit on port: %d', port);
});

exports.port = port;