'use strict';
angular.module('sgRegistrationApp')
    .controller('RegisterController', function ($scope, $state, RegisterFactory, ionicDatePicker, ionicToast, $cordovaCamera) {

        $scope.newRegistration = {
            Id: null,
            Name: null,
            PictureURL: null,
            PhoneNumber: null,
            College: null,
            Course: null,
            PassportNumber: null,
            PassportImageURL: null,
            VisaStartDate: new Date(),
            VisaEndDate: new Date(),
            VisaImageURL: null,
            RegionalPermitStartDate: new Date(),
            RegionalPermitEndDate: new Date(),
            RegionalPermitImageURL: null
        };

        var ipObj1 = {
            callback: function (val) { //Mandatory
                $scope.newRegistration.VisaStartDate = moment(val).format('YYYY-MM-DD');
            },
            from: new Date(2010, 0, 1), //Optional
            to: new Date(2040, 0, 1), //Optional
            inputDate: new Date(), //Optional
            mondayFirst: false, //Optional
            closeOnSelect: true, //Optional
            templateType: 'popup' //Optional
        };
        var ipObj2 = {
            callback: function (val) { //Mandatory
                $scope.newRegistration.VisaEndDate = moment(val).format('YYYY-MM-DD');
            },
            from: new Date(2010, 0, 1), //Optional
            to: new Date(2040, 0, 1), //Optional
            inputDate: new Date(), //Optional
            mondayFirst: false, //Optional
            closeOnSelect: true, //Optional
            templateType: 'popup' //Optional
        };
        var ipObj3 = {
            callback: function (val) { //Mandatory
                $scope.newRegistration.RegionalPermitStartDate = moment(val).format('YYYY-MM-DD');
            },
            from: new Date(2010, 0, 1), //Optional
            to: new Date(2040, 0, 1), //Optional
            inputDate: new Date(), //Optional
            mondayFirst: false, //Optional
            closeOnSelect: true, //Optional
            templateType: 'popup' //Optional
        };
        var ipObj4 = {
            callback: function (val) { //Mandatory
                $scope.newRegistration.RegionalPermitEndDate = moment(val).format('YYYY-MM-DD');
            },
            from: new Date(2010, 0, 1), //Optional
            to: new Date(2040, 0, 1), //Optional
            inputDate: new Date(), //Optional
            mondayFirst: false, //Optional
            closeOnSelect: true, //Optional
            templateType: 'popup' //Optional
        };

        $scope.openVisaStartDatePicker = function () {
            ionicDatePicker.openDatePicker(ipObj1);
        };
        $scope.openVisaEndDatePicker = function () {
            ionicDatePicker.openDatePicker(ipObj2);
        };
        $scope.openRegionalPermitStartDatePicker = function () {
            ionicDatePicker.openDatePicker(ipObj3);
        };
        $scope.openRegionalPermitEndDatePicker = function () {
            ionicDatePicker.openDatePicker(ipObj4);
        };

        $scope.register = function () {
            if ($scope.newRegistration.Name == null || $scope.newRegistration.Name == "" ||
                $scope.newRegistration.PictureURL == null || $scope.newRegistration.PictureURL == "" ||
                $scope.newRegistration.PhoneNumber == null || $scope.newRegistration.PhoneNumber == "" ||
                $scope.newRegistration.College == null || $scope.newRegistration.College == "" ||
                $scope.newRegistration.Course == null || $scope.newRegistration.Course == "" ||
                $scope.newRegistration.PassportNumber == null || $scope.newRegistration.PassportNumber == "" ||
                $scope.newRegistration.PassportImageURL == null || $scope.newRegistration.PassportImageURL == "" ||
                $scope.newRegistration.VisaImageURL == null || $scope.newRegistration.VisaImageURL == "" ||
                $scope.newRegistration.RegionalPermitImageURL == null || $scope.newRegistration.RegionalPermitImageURL == "") {
                ionicToast.show('Please enter all the details', 'bottom', false, 2500);
            } else {
                RegisterFactory.register($scope.newRegistration)
                    .then(function (success) {
                        if (success.data.Code != "S001") {
                            ionicToast.show(success.data.Message, 'bottom', false, 2500);
                        } else {
                            ionicToast.show('Registration successful', 'bottom', false, 2500);
                            $scope.newRegistration = {
                                Id: null,
                                Name: null,
                                PictureURL: null,
                                PhoneNumber: null,
                                College: null,
                                Course: null,
                                PassportNumber: null,
                                PassportImageURL: null,
                                VisaStartDate: new Date(),
                                VisaEndDate: new Date(),
                                VisaImageURL: null,
                                RegionalPermitStartDate: new Date(),
                                RegionalPermitEndDate: new Date(),
                                RegionalPermitImageURL: null
                            };
                        }
                    }, function (error) {
                        ionicToast.show(error, 'bottom', false, 2500);
                    });
            }
        };

        $scope.scanPhoto = function () {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                encodingType: Camera.EncodingType.JPEG,
            };
            $cordovaCamera.getPicture(options)
                .then(function (image) {
                    $scope.newRegistration.PictureURL = "data:image/jpeg;base64," + image;
                },
                function (err) {
                    console.log(err);
                });
        };

        $scope.scanPassport = function () {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                encodingType: Camera.EncodingType.JPEG,
            };
            $cordovaCamera.getPicture(options)
                .then(function (image) {
                    $scope.newRegistration.PassportImageURL = "data:image/jpeg;base64," + image;
                },
                function (err) {
                    console.log(err);
                });
        };

        $scope.scanVisa = function () {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                encodingType: Camera.EncodingType.JPEG,
            };
            $cordovaCamera.getPicture(options)
                .then(function (image) {
                    $scope.newRegistration.VisaImageURL = "data:image/jpeg;base64," + image;
                },
                function (err) {
                    console.log(err);
                });
        };

        $scope.scanRP = function () {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                encodingType: Camera.EncodingType.JPEG,
            };
            $cordovaCamera.getPicture(options)
                .then(function (image) {
                    $scope.newRegistration.RegionalPermitImageURL = "data:image/jpeg;base64," + image;
                },
                function (err) {
                    console.log(err);
                });
        };
    });
