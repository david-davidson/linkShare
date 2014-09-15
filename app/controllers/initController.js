'use strict';

module.exports = function(app) {
	app.controller('initController',
		[ '$scope', 'httpService',
		function($scope, httpService) {

			$scope.newLink = {};
			$scope.newLink.linkBody = '';

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

		} ]);
};