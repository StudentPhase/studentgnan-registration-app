'use strict';
angular.module('sgRegistrationApp')
    .controller('ContactDetailsController', function($scope, $state, EmergencyContactFactory, ionicToast, $ionicHistory) {
        $scope.contactDetails = EmergencyContactFactory.selectedContact;
        $scope.call = function(contact) {
            var call = "tel:" + contact;
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