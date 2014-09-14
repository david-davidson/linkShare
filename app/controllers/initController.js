'use strict';

module.exports = function(app) {
	app.controller('initController',
		[ '$scope', 'talkToServer',
		function($scope, talkToServer) {

			$scope.getAllLinks = function() {
	      talkToServer.get()
        .success(function(data) {
           $scope.links = data;
        });
	    };
	    $scope.getAllLinks();

			$scope.message = 'Hello, world!';
		} ]);
};