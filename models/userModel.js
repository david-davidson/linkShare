'use strict';

var mongoose, bcrypt, jwt, moment, UserSchema;

mongoose = require('mongoose');
bcrypt = require('bcrypt-nodejs');
jwt = require('jwt-simple');
moment = require('moment');

UserSchema = mongoose.Schema({
	// Wrapped in `basic` to allow for OAuth down the road
	basic: {
		email: String,
		password: String
	}
});

/**
 * Hashes incoming password
 *
 * Note `methods`, not `prototype`; comes from Mongoose
 */

UserSchema.methods.generateHash = function(password) {
	// Here, '8', corresponds to the size of the block; as it gets bigger, it gets more secure, but exponentially slower
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
 * Compares incoming password to the password in the db
 */

UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.basic.password);
};

/**
 * Generates our JWT
 */

UserSchema.methods.createToken = function(app) {
	var expires, self, token;

	expires = moment().add(7, 'days').valueOf(); // Forces folks to log in once a week
	self = this;
	token = jwt.encode({
		iss: self._id, // basically == id
		expires: expires
	}, app.get('jwtTokenSecret'));
	return token;
};

module.exports = mongoose.model('UserModel', UserSchema);