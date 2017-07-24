'use strict';
angular.module('sgRegistrationApp')
    .controller('AddContactController', function($scope, $state, EmergencyContactFactory, ionicToast, $ionicHistory, $cordovaCamera) {

        $scope.newContact = {
            Id: null,
            Name: null,
            Address: null,
            ImageBytes: null,
            PhoneNumber: null,
            Area: null,
            CategoryId: null
        };

        $scope.categories = [];

        $scope.create = function() {
            if ($scope.newContact.Name == "" || $scope.newContact.Name == null ||
                $scope.newContact.ImageBytes == undefined || $scope.newContact.ImageBytes == null ||
                $scope.newContact.CategoryId == undefined || $scope.newContact.CategoryId == null) {
                ionicToast.show('Please enter all the fields', 'bottom', false, 2500);
            } else {
                EmergencyContactFactory.addEmergencyContact($scope.newContact)
                    .then(function(success) {
                        if (success.data.Code != "S001") {
                            ionicToast.show(success.data.Message, 'bottom', false, 2500);
                        } else {
                            ionicToast.show('Contact created successfully', 'bottom', false, 2500);
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
            EmergencyContactFactory.getAllCategories()
                .then(function(success) {
                    if (success.data.Code != "S001") {
                        ionicToast.show(success.data.Message, 'bottom', false, 2500);
                    } else {
                        for (var i = 0; i < success.data.Data.length; i++) {
                            if (success.data.Data[i].CategoryType == "EMERGENCY") {
                                $scope.categories.push(success.data.Data[i]);
                            }
                        }
                    }
                }, function(error) {
                    ionicToast.show(error, 'bottom', false, 2500);
                });
        };

        $scope.pickImage = function() {
            var options = {
                quality: 40,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                encodingType: Camera.EncodingType.JPEG,
            };
            $cordovaCamera.getPicture(options)
                .then(function(image) {
                        $scope.newContact.ImageBytes = "data:image/jpeg;base64," + image;
                    },
                    function(err) {
                        console.log(err);
                    });
        };

        $scope.getAllCategories();

    });