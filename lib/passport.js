'use strict';

var BasicStrategy, UserModel;

BasicStrategy = require('passport-http').BasicStrategy;
UserModel = require('../models/userModel');

/**
 * Tells passport how to authenticate requests: basically, describes the
 * conditions for a successful request
 *
 * BTW, used only when users sign in directly: when they create an account,
 * they don't go through immediate authentication; after that, the JWT
 * authenticates them automatically
 */

module.exports = function(passport) {
	passport.use('basic', new BasicStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},
	function(email, password, done) {
		UserModel.findOne({ 'basic.email': email }, function(err, user) {

			// Errors, etc...
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false);
			}
			if (!user.matchingPassword(password)) {  // Bcrypt method from the user schema
				return done(null, false); // Intentionally vague error message reveals nothing
			}

			// ...Else return the validated user!
			return done(null, user);
		});
	}));
};