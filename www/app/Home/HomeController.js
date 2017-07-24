'use strict';
angular.module('sgRegistrationApp')
    .controller('HomeController', function($scope, $state, LoginFactory, $rootScope, $ionicSlideBoxDelegate, OfferFactory, ionicToast, HomeFactory) {
        $scope.loggedInUser = LoginFactory.loggedInUser;
        $rootScope.$broadcast('userLoggedIn');
        $ionicSlideBoxDelegate.slide(0);
        $scope.categories = [];
        $scope.offerCategories = []

        $scope.slideHasChanger = function(index) {
            console.log(index);
        };

        $scope.getAllCategories = function() {
            OfferFactory.getAllCategories()
                .then(function(success) {
                    if (success.data.Code != "S001") {
                        ionicToast.show(success.data.Message, 'bottom', false, 2500);
                    } else {
                        var obj1 = [];
                        var obj2 = [];
                        for (var i = 0; i < success.data.Data.length; i++) {
                            if (success.data.Data[i].CategoryType == "EMERGENCY") {
                                obj1.push(success.data.Data[i]);
                            }
                            if (success.data.Data[i].CategoryType == "OFFER") {
                                obj2.push(success.data.Data[i]);
                            }
                        }
                        $scope.categories = $scope.chunk(obj1, 4);
                        $scope.offerCategories = $scope.chunk(obj2, 4);
                    }
                }, function(error) {
                    ionicToast.show(error, 'bottom', false, 2500);
                });
        };

        $scope.emergencyCategorySelected = function(category) {
            HomeFactory.selectedCategory = category;
            $state.go('menu.emergency');
        };

        $scope.offerCategorySelected = function(category) {
            HomeFactory.selectedCategory = category;
            $state.go('menu.offerList');
        };

        $scope.notifications = function() {
            $state.go('menu.notificationsList');
        };

        $scope.chunk = function(arr, size) {
            var newArr = [];
            for (var i = 0; i < arr.length; i += size) {
                newArr.push(arr.slice(i, i + size));
            }
            return newArr;
        };

        $scope.getAllCategories();
    });