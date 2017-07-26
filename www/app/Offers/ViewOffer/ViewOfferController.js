'use strict';
angular.module('sgRegistrationApp')
    .controller('ViewOfferController', function($scope, $state, OfferFactory, ionicToast, $ionicHistory, $sce, LoginFactory, $ionicPopup) {
        $scope.offerDetails = angular.copy(OfferFactory.selectedOffer);
        $scope.loggedInUser = LoginFactory.loggedInUser;
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

        $scope.sendNotification = function() {
            var obj = angular.copy($scope.offerDetails);
            obj.VideoURL = OfferFactory.selectedOffer.VideoURL;
            OfferFactory.sendOfferNotification(obj)
                .then(function(success) {
                    if (success.data.Code != "S001") {
                        ionicToast.show(success.data.Message, 'bottom', false, 2500);
                    } else {
                        ionicToast.show('Notification sent successfully', 'bottom', false, 2500);
                    }
                }, function(error) {
                    ionicToast.show(error, 'bottom', false, 2500);
                });
        };

        $scope.deleteOffer = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete Offer',
                template: 'Are you sure you want to delete this Offer?',
                buttons: [{
                        text: 'Cancel',
                        type: 'button-light'
                    },
                    {
                        text: 'Ok',
                        type: 'button-custom',
                        onTap: function(e) {
                            // Returning a value will cause the promise to resolve with the given value.
                            OfferFactory.deleteOffer($scope.offerDetails)
                                .then(function(success) {
                                    if (success.data.Code != "S001") {
                                        ionicToast.show(success.data.Message, 'bottom', false, 2500);
                                    } else {
                                        ionicToast.show('Offer deleted Successfully', 'bottom', false, 2500);
                                        $ionicHistory.nextViewOptions({
                                            disableBack: true
                                        });
                                        $state.go('menu.offerList');
                                    }
                                }, function(error) {
                                    ionicToast.show(error, 'bottom', false, 2500);
                                });
                        }
                    }
                ]
            });
        };

    });