'use strict';

module.exports = function(app) {
	app.controller('initController',
		[ '$scope', 'httpService', '$http', '$cookies', '$location',
		function($scope, httpService, $http, $cookies, $location) {

			$scope.newLink = {};
			$scope.newLink.linkBody = '';

			$http.defaults.headers.common.jwt = $cookies.jwt; // jshint ignore: line
			console.log('cookies: ' + $http.defaults.headers.common.jwt); // jshint ignore: line

	    // Create
	    $scope.saveNewLink = function() {
	    	httpService.post($scope.newLink)
	    	.success(function() {
	    		$scope.getAllLinks();
	    	});
	    	$scope.newLink.linkBody = ''; // Reset the form
	    };

			// Read
			$scope.getAllLinks = function() {
	      httpService.get()
        .success(function(data) {
           $scope.links = data;
        });
	    };
	    $scope.getAllLinks(); // Grab the data when the controller loads

	    // Update
	    $scope.updateLink = function(link) {
	    	link.editing = true;
	    };
	    $scope.saveOldLink = function(link) {
	    	httpService.put(link)
        .success(function() {
          $scope.getAllLinks();
        });
	    };

	    // Delete
	    $scope.deleteLink = function(link) {
	    	httpService.delete(link)
	    	.success(function() {
	    		$scope.getAllLinks();
	    	});
	    };

	    $scope.signOut = function() {
	    	delete $cookies.jwt;
	    	$location.path('/signin');
	    };

		} ]);
};