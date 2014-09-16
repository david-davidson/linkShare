'use strict';

module.exports = function(app) {
  app.controller('signInController', [
    '$scope', '$http', '$base64', '$cookies', '$location',
    function($scope, $http, $base64, $cookies, $location) {
      $scope.signIn = function() {
        $http.defaults.headers.common.Authentication = 'Basic ' + // jshint ignore: line
          $base64.encode(
            $scope.user.email + ':' +
            $scope.user.password
          );
        $http({
          method: 'GET',
          url: '/api/001/users'
        })
        .success(function(data) {
          $cookies.jwt = data.jwt;
          $location.path('/links');
        })
        .error(function(error) {
          console.log('error in signInController! ' + error);
        });
      };

      $scope.createNewUser = function() {
        $http.post('/api/001/users', {
          'email': $scope.user.newEmail,
          'password': $scope.user.newPassword
        })
        .success(function(data) {
          $cookies.jwt = data.jwt;
          $location.path('/links');
        })
        .error(function(error) {
          console.log('error in signInController! ' + error);
        });
      };
    }
  ]);
};