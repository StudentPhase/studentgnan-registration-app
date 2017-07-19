'use strict';
angular.module('sgRegistrationApp')
    .controller('AddContactController', function($scope, $state, EmergencyContactFactory, ionicToast, $ionicHistory) {

        $scope.newContact = {
            Id: null,
            Name: null,
            Address: null,
            PhoneNumber: null,
            Area: null,
            CategoryId: null
        };

        $scope.categories = [];

        $scope.create = function() {
            if ($scope.newContact.Name == "" || $scope.newContact.Name == null ||
                $scope.newContact.Address == "" || $scope.newContact.Address == null ||
                $scope.newContact.PhoneNumber == undefined || $scope.newContact.PhoneNumber == null ||
                $scope.newContact.Area == "" || $scope.newContact.Area == null ||
                $scope.newContact.CategoryId == undefined || $scope.newContact.CategoryId == null) {
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

        $scope.getAllCategories = function() {
            EmergencyContactFactory.getAllCategories()
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