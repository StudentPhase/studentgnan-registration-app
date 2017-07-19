'use strict';
angular.module('sgRegistrationApp')
    .controller('CreateOfferController', function($scope, $state, OfferFactory, ionicToast, $ionicHistory) {

        $scope.newOffer = {
            Id: null,
            Title: null,
            Description: null,
            VideoURL: null,
            ImageURL: null,
            Address: null,
            PhoneNumber: null,
            Website: null,
            OfferCode: null,
            CategoryId: null
        };

        $scope.categories = [];

        $scope.create = function() {
            if ($scope.newOffer.Title == "" || $scope.newOffer.Title == null ||
                $scope.newOffer.Description == "" || $scope.newOffer.Description == null ||
                $scope.newOffer.Address == "" || $scope.newOffer.Address == null ||
                $scope.newOffer.PhoneNumber == undefined || $scope.newOffer.PhoneNumber == null ||
                $scope.newOffer.Website == "" || $scope.newOffer.Website == null ||
                $scope.newOffer.OfferCode == "" || $scope.newOffer.OfferCode == null ||
                $scope.newOffer.CategoryId == undefined || $scope.newOffer.CategoryId == null) {
                ionicToast.show('Please enter all the fields', 'bottom', false, 2500);
            } else {
                OfferFactory.addOffer($scope.newOffer)
                    .then(function(success) {
                        if (success.data.Code != "S001") {
                            ionicToast.show(success.data.Message, 'bottom', false, 2500);
                        } else {
                            ionicToast.show(success.data.Message, 'bottom', false, 2500);
                            $ionicHistory.nextViewOptions({
                                disableBack: true
                            });
                            $state.go('menu.home');
                        }
                    }, function(error) {
                        ionicToast.show(error, 'bottom', false, 2500);
                    });
            }
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
        }

        $scope.getAllCategories();

    });