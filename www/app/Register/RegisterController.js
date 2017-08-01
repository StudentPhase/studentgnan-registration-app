'use strict';
angular.module('sgRegistrationApp')
    .controller('RegisterController', function($scope, $state, RegisterFactory, ionicDatePicker, ionicToast, $ionicHistory, $cordovaCamera) {
        $scope.showPasswordIsChecked = false;
        $scope.newRegistration = {
            Id: null,
            Name: null,
            PhoneNumber: null,
            DateOfBirth: new Date(),
            College: null,
            Course: null,
            Address: null,
            Email: null,
            PassportNumber: null,
            PassportImageBytes: null,
            Password: null
        };

        $scope.confirm = {
            ConfirmPassword: null
        };

        var ipObj1 = {
            callback: function(val) { //Mandatory
                $scope.newRegistration.DateOfBirth = moment(val).format('YYYY-MM-DD');
            },
            from: new Date(1970, 0, 1), //Optional
            to: new Date(), //Optional
            inputDate: new Date(), //Optional
            mondayFirst: false, //Optional
            closeOnSelect: true, //Optional
            templateType: 'popup' //Optional
        };

        $scope.openDOBPicker = function() {
            ionicDatePicker.openDatePicker(ipObj1);
        };

        $scope.register = function() {
            if ($scope.newRegistration.Name == null || $scope.newRegistration.Name == "" ||
                $scope.newRegistration.PhoneNumber == null || $scope.newRegistration.PhoneNumber == "" ||
                $scope.newRegistration.College == null || $scope.newRegistration.College == "" ||
                $scope.newRegistration.Course == null || $scope.newRegistration.Course == "" ||
                $scope.newRegistration.Address == null || $scope.newRegistration.Address == "" ||
                $scope.newRegistration.Email == null || $scope.newRegistration.Email == "" ||
                $scope.newRegistration.PassportNumber == null || $scope.newRegistration.PassportNumber == "" ||
                $scope.newRegistration.PassportImageBytes == null || $scope.newRegistration.PassportImageBytes == "" ||
                $scope.newRegistration.Password == null || $scope.newRegistration.Password == "" ||
                $scope.confirm.ConfirmPassword == null || $scope.confirm.ConfirmPassword == "") {
                ionicToast.show('Please enter all the details', 'bottom', false, 2500);
            } else {
                if ($scope.newRegistration.Password != $scope.confirm.ConfirmPassword) {
                    ionicToast.show('Password and confirm password donot match', 'bottom', false, 2500);
                } else {
                    RegisterFactory.register($scope.newRegistration)
                        .then(function(success) {
                            if (success.data.Code != "S001") {
                                ionicToast.show(success.data.Message, 'bottom', false, 2500);
                            } else {
                                ionicToast.show('Registration successful. Login to continue!', 'bottom', false, 2500);
                                $ionicHistory.goBack();
                            }
                        }, function(error) {
                            ionicToast.show(error, 'bottom', false, 2500);
                        });
                }
            }
        };

        $scope.scanPassport = function() {
            var options = {
                quality: 40,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                encodingType: Camera.EncodingType.JPEG,
            };
            $cordovaCamera.getPicture(options)
                .then(function(image) {
                        $scope.newRegistration.PassportImageBytes = "data:image/jpeg;base64," + image;
                    },
                    function(err) {
                        console.log(err);
                    });
        };
    });