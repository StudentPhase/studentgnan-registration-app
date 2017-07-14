'use strict';
angular.module('sgRegistrationApp')
    .controller('HomeController', function($scope, $state, LoginFactory, $rootScope) {
        $scope.loggedInUser = LoginFactory.loggedInUser;
        $rootScope.$broadcast('userLoggedIn');
    });