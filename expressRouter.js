'use strict';

var Link = require('./models/linkModel');

module.exports = function(app) {
	var apiUrl = '/api/001';

	// CREATE
	app.post(apiUrl, function(req, res) {
		var link = new Link(req.body);
		link.save(function(err, resLink) {
			if (err) {
				return res.status(500).json(err);
			}
			return res.status(200).json(resLink);
		});
	});

	// READ
	app.get(apiUrl, function(req, res) {
		Link.find({}, function(err, link) {
			if (err) {
				return res.status(500).json(err);
			}
			return res.json(link);
		});
	});

	// UPDATE
	app.put(apiUrl + '/:id', function(req, res) {
		var link = req.body;
		delete link._id;
		Link.findOneAndUpdate({ '_id': req.params.id }, link, function(err, resNote) {
			if (err) {
				return res.status(500).json(err);
			}
			return res.status(202).json(resNote);
		});
	});

	// DELETE
	app.delete(apiUrl + '/:id', function(req, res) {
		Link.remove({ '_id': req.params.id }, function(err) {
			if (err) {
				return res.status(500).json(err);
			}
			return res.status(200).json({
				'message': 'deleted'
			});
		});
	});

};