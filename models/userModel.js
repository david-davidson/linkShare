'use strict';

var mongoose, bcrypt, jwt, moment, UserSchema;

mongoose = require('mongoose');
bcrypt = require('bcrypt-nodejs');
jwt = require('jwt-simple');
moment = require('moment');

/**
 * Basic schema for a new user: email and password
 */

UserSchema = mongoose.Schema({
	// Wrapped in `basic` to allow for OAuth, etc., down the road
	basic: {
		email: String,
		password: String
	}
});

/**
 * Runs an incoming password through a one-way hash
 *
 * Note `methods`, not `prototype`; comes from Mongoose
 */

UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); // 8: larger = more secure, but exponentially slower
};

/**
 * Checks incoming password against hashed password in the db
 */

UserSchema.methods.matchingPassword = function(password) {
	return bcrypt.compareSync(password, this.basic.password);
};

/**
 * After a user is succesfully authenticated, creates a new JSON web token
 */

UserSchema.methods.createToken = function(app) {
	var expires, self, token;

	expires = moment().add(7, 'days').valueOf(); // Forces folks to log in once a week
	self = this;

	token = jwt.encode({
		iss: self._id, // basically == id
		expires: expires
	}, app.get('jwtTokenSecret')); // The token we config in server.js

	return token;
};

module.exports = mongoose.model('UserModel', UserSchema);