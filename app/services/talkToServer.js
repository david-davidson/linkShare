'use strict';

module.exports = function(app) {
	app.factory('talkToServer', function($http) {
		var httpVerbs = {
			get: function() {
				var promise = $http({
					method: 'GET',
					url: '/api/001'
				})
				.error(function(data, status) {
					console.log('error in $http GET! ' + data + ' | ' + status);
				});

				return promise;
			}
		};

		return httpVerbs;
	});
};