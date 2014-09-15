'use strict';

module.exports = function(app) {
	app.factory('httpService', function($http) {

		// Generic helper function
		var http = function(method, params) {
			params.id = params.id || '';
			var promise = $http[method]('/api/001/' + params.id, params.data)
			.error(function(error, status) {
				console.log('Error in http ' + method + ': ' + error + ' | status ' + status);
			});
			return promise;
		},

		httpVerbs = {

			get: function() {
				return http('get', {});
			},

			post: function(link) {
				return http('post', {
					data: {
						linkBody: link.linkBody
					}
				});
			},

			put: function(link) {
				return http('put', {
					data: {
						linkBody: link.linkBody
					},
					id: link._id
				});
			},

			delete: function(link) {
				return http('delete', {
					id: link._id
				});
			}

		};

		return httpVerbs;
	});
};