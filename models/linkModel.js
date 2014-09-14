'use strict';

var mongoose = require('mongoose'),
	linkSchema = mongoose.Schema({
		linkBody: String
	});

module.exports = mongoose.model('Link', linkSchema);