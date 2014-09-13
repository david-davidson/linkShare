'use strict';

var express = require('express');
var http = require('http');
var bodyparser = require('body-parser'); // No longer part of express core
var mongoose = require('mongoose');
var app = express();

mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGO_URL || 'mongodb://localhost/links');

app.use(express.static(__dirname + (process.env.STATIC_DIR || '/build')));

app.use(bodyparser.json()); // Invoke the middleware

var port = process.env.PORT || 3000;
exports.port = port;

require('./expressRouter')(app);

var server = http.createServer(app);

server.listen(port, function() {
	console.log('server running on port ' + port);
});

exports.port = port;