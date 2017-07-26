'use strict';
angular.module('sgRegistrationApp')
    .controller('ContactDetailsController', function($scope, $state, EmergencyContactFactory, ionicToast, $ionicHistory, $sce, $ionicPopup, LoginFactory) {
        $scope.contactDetails = EmergencyContactFactory.selectedContact;
        $scope.contactDetails.ImageURL = $sce.trustAsResourceUrl($scope.contactDetails.ImageURL);
        $scope.call = function(contact) {
            var call = "tel:" + contact;
            document.location.href = call;
        };
        $scope.loggedInUser = LoginFactory.loggedInUser;

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

        $scope.deleteContact = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete Contact',
                template: 'Are you sure you want to delete this Contact?',
                buttons: [{
                        text: 'Cancel',
                        type: 'button-light'
                    },
                    {
                        text: 'Ok',
                        type: 'button-custom',
                        onTap: function(e) {
                            // Returning a value will cause the promise to resolve with the given value.
                            EmergencyContactFactory.deleteContact($scope.contactDetails)
                                .then(function(success) {
                                    if (success.data.Code != "S001") {
                                        ionicToast.show(success.data.Message, 'bottom', false, 2500);
                                    } else {
                                        ionicToast.show('Contact deleted Successfully', 'bottom', false, 2500);
                                        $ionicHistory.nextViewOptions({
                                            disableBack: true
                                        });
                                        $state.go('menu.emergency');
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