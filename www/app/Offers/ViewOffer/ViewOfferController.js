'use strict';
angular.module('sgRegistrationApp')
    .controller('ViewOfferController', function($scope, $state, OfferFactory, ionicToast, $ionicHistory, $sce) {
        $scope.offerDetails = OfferFactory.selectedOffer;
        if ($scope.offerDetails.VideoURL != "" || $scope.offerDetails.VideoURL != null) {
            $scope.offerDetails.VideoURL = $sce.trustAsResourceUrl($scope.offerDetails.VideoURL);
        }

        $scope.call = function(offer) {
            var call = "tel:" + offer;
            document.location.href = call;
        };

        $scope.navigate = function(address) {
            launchnavigator.isAppAvailable(launchnavigator.APP.GOOGLE_MAPS, function(isAvailable) {
                var app;
                if (isAvailable) {
                    app = launchnavigator.APP.GOOGLE_MAPS;
                } else {
                    ionicToast.show("Google Maps not available - falling back to user selection", 'bottom', false, 2500);
                    app = launchnavigator.APP.USER_SELECT;
                }
                launchnavigator.navigate(address, {
                    app: app
                });
            });
        };

    });