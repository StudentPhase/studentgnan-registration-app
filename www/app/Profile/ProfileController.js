'use strict';
angular.module('sgRegistrationApp')
    .controller('ProfileController', function($scope, $state, LoginFactory) {

        $scope.userDetails = LoginFactory.loggedInUser;

    });