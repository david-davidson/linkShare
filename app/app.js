'use strict';

require('angular/angular');
require('angular-route');

var linkShare = angular.module('linkShare', [
		'ngRoute'
	]);

// Services
require('./services/talkToServer')(linkShare);

// Models

// Controllers
require('./controllers/initController')(linkShare);

// Directives

// Routes
linkShare.config([ '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		controller: 'initController',
		templateUrl: 'views/initView.html'
	})
	.otherwise({
		redirectTo: '/'
	});

	$locationProvider.html5Mode(true);
} ]);