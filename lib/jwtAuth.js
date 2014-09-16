'use strict';

var UserModel, jwt;

UserModel = require('../models/userModel');
jwt = require('jwt-simple');

/**
 * Middleware that checks if the incoming token/user is valid
 */

module.exports = function(app) {

	/**
	 * Create a jwtAuth object with an auth method
	 *
	 * This (the method) is the only part that'll actually be passed into
	 * our API router, but it needs to see the app for its JWT token secret
	 */

	var jwtAuth = {
		auth: function(req, res, next) {
			var token, decoded;
			token = req.body.jwt; // token, once decoded, holds user id and expiration
			// (Note: we have to implement expiration ourselves)

			// Try to decode the token
			try {
				decoded = jwt.decode(token, app.get('jwtTokenSecret')); //  Note that changing the token secret makes this throw an error!
				console.log('decode OK');
			} catch(err) {
				console.log('decode error!');
				return res.status(401).json({ 'msg': 'access denied' });
			}

			// Looks for the decoded user in our db
			UserModel.findOne({ '_id': decoded.iss }, function(err, user) {
				if (err) {
					return res.status(500).json(err);
				}
				if (!user) {
					return res.status(401).json({ 'msg': 'access denied' });
				}

				console.log('user found!');
				req.user = user;
				next(); // On to the next middleware!
			});
		}
	};

	return jwtAuth;
};