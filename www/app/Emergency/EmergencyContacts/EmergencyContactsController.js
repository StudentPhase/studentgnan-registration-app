'use strict';
angular.module('sgRegistrationApp')
    .controller('EmergencyContactsController', function($scope, $state, $stateParams, EmergencyContactFactory, ionicToast, HomeFactory) {

        $scope.contacts = [];

        $scope.Logo = HomeFactory.selectedCategory.LogoURL;

        $scope.getAllContacts = function() {
            EmergencyContactFactory.getAllEmergencyContacts(HomeFactory.selectedCategory.Id)
                .then(function(success) {
                    if (success.data.Code != "S001") {
                        ionicToast.show(success.data.Message, 'bottom', false, 2500);
                    } else {
                        $scope.contacts = success.data.Data;
                    }
                }, function(error) {
                    ionicToast.show(error, 'bottom', false, 2500);
                });
        };

        $scope.addContact = function() {
            $state.go('menu.addEmergencyContact');
        };

        $scope.contactSelected = function(contact) {
            EmergencyContactFactory.selectedContact = contact;
            $state.go('menu.contactDetails');
        };

        $scope.getAllContacts();
    });