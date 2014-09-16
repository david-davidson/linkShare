'use strict';

var UserModel, jwt;

UserModel = require('../models/userModel');
jwt = require('jwt-simple');

module.exports = function(app) {
	var jwtAuth = {
		auth: function(req, res, next) {
			var token, decoded;
			token = req.body.jwt; // Pulls straight from the incoming request
			// token holds user id, and expiration
			// Note: we have to implement expiration ourselves

			// BTW, this is middleware in express: a function that we set up in/from a route
			// Since there's other middleware involved, we need to call next() to keep things moving

			// Attempt to decode the token
			try {
				decoded = jwt.decode(token, app.get('jwtTokenSecret'));
				console.log('decode OK');
			} catch(err) {
				console.log('decode error!!!');
				return res.status(401).json({ 'msg': 'access denied' }); // Should be no user w/ no ID
			}

			UserModel.findOne({ '_id': decoded.iss }, function(err, user) {
				if (err) {
					return res.status(500).json(err);
				}
				if (!user) {
					return res.status(401).json({ 'msg': 'access denied' });
				}

				console.log('user found');
				req.user = user;
				next(); // On to the next middleware!
			});
		}
	};

	return jwtAuth;
};