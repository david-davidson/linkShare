'use strict';

// Note: will eventually need SSL certificate: https://www.openssl.org/docs/HOWTO/certificates.txt

var UserModel = require('./models/userModel');

module.exports = function(app, passport) {

	/**
	 * Creates new users: checks that the email isn't a duplicate, hashes the password,
	 * and saves everything to the db
	 */

	app.post('/api/001/users', function(req, res) {
		UserModel.findOne({ 'basic.email': req.body.email }, function(err, user) {
			// Errors, duplicates, etc...
			if (err) {
				console.log('error in user model\'s search for user!');
				return res.status(500).json(err);
			}
			if (user) {
				return res.status(401).json({ 'msg': 'cannot create user' });
			}

			// ...If we've made it this far, fill in the user model...
			var newUser = new UserModel();
			newUser.basic.email = req.body.email;
			newUser.basic.password = newUser.generateHash(req.body.password);

			// ... and save it to the db
			newUser.save(function(err, dbResponse) {
				if (err) {
					return res.status(500).json(err);
				}
				return res.status(200).json({ 'jwt': dbResponse.createToken(app) });
			});
		});
	});

	/**
	 * Log in existing users
	 */

	app.get('/api/001/users',
		// Here's where passport comes in:
		passport.authenticate('basic', { session: false }),
		function(req, res) {
			res.json({ 'jwt': req.user.createToken(app) });
		});
};