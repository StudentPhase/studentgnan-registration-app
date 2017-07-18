'use strict';
angular.module('sgRegistrationApp')
    .controller('AddContactController', function($scope, $state, EmergencyContactFactory, ionicToast, $ionicHistory) {

        $scope.newContact = {
            Id: null,
            Name: null,
            Address: null
        };

        $scope.create = function() {
            if ($scope.newContact.Name == "" || $scope.newContact.Name == null || $scope.newContact.Address == "" || $scope.newContact.Address == null) {
                ionicToast.show('Please enter all the fields', 'bottom', false, 2500);
            } else {
                EmergencyContactFactory.addEmergencyContact($scope.newContact)
                    .then(function(success) {
                        if (success.data.Code != "S001") {
                            ionicToast.show(success.data.Message, 'bottom', false, 2500);
                        } else {
                            ionicToast.show(success.data.Message, 'bottom', false, 2500);
                            $ionicHistory.nextViewOptions({
                                disableBack: true
                            });
                            $state.go('menu.emergency');
                        }
                    }, function(error) {
                        ionicToast.show(error, 'bottom', false, 2500);
                    });
            }
        };

    });