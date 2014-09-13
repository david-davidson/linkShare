'use strict';

var mongoose = require('mongoose');
var linkSchema = mongoose.Schema({
	linkBody: String
});

module.exports = mongoose.model('Link', linkSchema);