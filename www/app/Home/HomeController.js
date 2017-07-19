'use strict';
angular.module('sgRegistrationApp')
    .controller('HomeController', function($scope, $state, LoginFactory, $rootScope, $ionicSlideBoxDelegate, OfferFactory, ionicToast) {
        $scope.loggedInUser = LoginFactory.loggedInUser;
        $rootScope.$broadcast('userLoggedIn');
        $ionicSlideBoxDelegate.slide(0);
        $scope.categories = [];

        $scope.slideHasChanger = function(index) {
            console.log(index);
        };

        $scope.getAllCategories = function() {
            OfferFactory.getAllCategories()
                .then(function(success) {
                    if (success.data.Code != "S001") {
                        ionicToast.show(success.data.Message, 'bottom', false, 2500);
                    } else {
                        $scope.categories = success.data.Data;
                    }
                }, function(error) {
                    ionicToast.show(error, 'bottom', false, 2500);
                });
        };

        $scope.emergencyCategorySelected = function(category) {
            $state.go('menu.emergency', { categoryId: category.Id });
        };

        $scope.offerCategorySelected = function(category) {
            $state.go('menu.offerList', { categoryId: category.Id });
        };

        $scope.getAllCategories();
    });