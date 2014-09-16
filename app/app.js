'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var linkShare = angular.module('linkShare', [
		'ngRoute',
		'base64',
		'ngCookies'
	]);

// Services
require('./services/httpService')(linkShare);

// Models

// Controllers
require('./controllers/initController')(linkShare);
require('./controllers/signInController')(linkShare);

// Directives

// Routes
linkShare.config([ '$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/links', {
			controller: 'initController',
			templateUrl: 'views/initView.html'
		})
		.when('/signin', {
      templateUrl: 'views/signInView.html',
      controller: 'signInController'
    })
		.otherwise({
			redirectTo: '/links'
		});

		$locationProvider.html5Mode(true);
} ]);