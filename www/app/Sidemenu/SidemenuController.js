'use strict';
angular.module('sgRegistrationApp')
    .controller('SidemenuController', function($scope, $state, LoginFactory, $rootScope) {

        $rootScope.$on('userLoggedIn', function(event) {
            $scope.loggedInUser = LoginFactory.loggedInUser;
        })

        $scope.logout = function() {
            LoginFactory.logout();
            $state.go('login');
        };
    });