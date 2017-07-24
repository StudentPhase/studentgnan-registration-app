'use strict';
angular.module('sgRegistrationApp')
    .controller('OfferListController', function($scope, $state, $stateParams, OfferFactory, ionicToast, HomeFactory) {

        $scope.offers = [];

        $scope.Logo = HomeFactory.selectedCategory.LogoURL;

        $scope.getAllOffers = function() {
            OfferFactory.getAllOffers(HomeFactory.selectedCategory.Id)
                .then(function(success) {
                    if (success.data.Code != "S001") {
                        ionicToast.show(success.data.Message, 'bottom', false, 2500);
                    } else {
                        $scope.offers = success.data.Data;
                    }
                }, function(error) {
                    ionicToast.show(error, 'bottom', false, 2500);
                });
        };

        $scope.addOffer = function() {
            $state.go('menu.createOffer');
        };

        $scope.offerSelected = function(offer) {
            OfferFactory.selectedOffer = offer;
            $state.go('menu.viewOffer');
        };

        $scope.getAllOffers();
    });