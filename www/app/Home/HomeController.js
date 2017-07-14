'use strict';
angular.module('sgRegistrationApp')
    .controller('HomeController', function($scope, $state, LoginFactory, $rootScope, $ionicSlideBoxDelegate) {
        $scope.loggedInUser = LoginFactory.loggedInUser;
        $rootScope.$broadcast('userLoggedIn');
        $ionicSlideBoxDelegate.slide(0);

        $scope.slideHasChanger = function(index) {
            console.log(index);
        };
    });