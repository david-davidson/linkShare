'use strict';

var BasicStrategy, User;

BasicStrategy = require('passport-http').BasicStrategy;
User = require('../models/userModel');

/**
 * Gets called with passport.authenticate
 */
module.exports = function(passport) {
	passport.use('basic', new BasicStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},
	function(email, password, done) {
		User.findOne({ 'basic.email': email }, function(err, user) {

			// Handle the error cases first:
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false); // No error, but no user: auth still unsuccessful
			}
			if (!user.validPassword(password)) {
				return done(null, false); // Invokes that bcrypt method from the user schema
				// Note that the error msg is the same: this way, we reveal no useful info in case of attack
			}
			// Else return the validated user!
			return done(null, user);
		});
	}));
};