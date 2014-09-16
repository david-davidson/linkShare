'use strict';

var UserModel = require('./models/userModel');

module.exports = function(app, passport) {

	/**
	 * Create a new user
	 */

	app.post('/api/001/users', function(req, res) {
		UserModel.findOne({ 'basic.email': req.body.email }, function(err, user) {
			if (err) {
				console.log('error!');
				return res.status(500).json(err);
			}
			if (user) {
				console.log('user exists!');
				return res.status(401).json({ 'msg': 'cannot create user' });
			}
			console.log('Made it this far...');

			var newUser = new UserModel();
			newUser.basic.email = req.body.email;
			newUser.basic.password = newUser.generateHash(req.body.password);

			newUser.save(function(err, dbResponse) {
				if (err) {
					return res.status(500).json(err);
				}

				return res.status(200).json({ 'jwt': dbResponse.createToken(app) });
			});
		});
	});

	/**
	 * Authenticate an existing user
	 */

	app.get('/api/001/users',
		passport.authenticate('basic', { session: false }), // Middleware!
		function(req, res) {
			res.json({ 'jwt': req.user.createToken(app) });
		});
};