'use strict';
angular.module('sgRegistrationApp')
    .controller('LoginController', function($scope, $state, LoginFactory) {

        $scope.loginData = {
            PhoneNumber: null,
            Password: '',
            DeviceId: null,
            AppVersion: '1.0.0',
            OperatingSystem: ionic.Platform.platform()
        };

        $scope.errorMessage = null;
        $scope.showUpdateButton = false;

        $scope.performLogin = function() {
            LoginFactory.login($scope.loginData)
                .then(function(success) {
                    if (success.data.Code == "E004") {
                        $scope.errorMessage = success.data.Message;
                        $scope.showUpdateButton = true;
                    } else if (success.data.Code != "S001") {
                        $scope.errorMessage = success.data.Message;
                    } else {
                        $scope.errorMessage = null;
                        $scope.showUpdateButton = false;
                        $state.go("menu.home");
                    }
                }, function(error) {
                    ionicToast.show(error, 'bottom', false, 2500);
                });
        };

        $scope.login = function() {
            if ($scope.loginData.PhoneNumber == undefined || $scope.loginData.PhoneNumber == "") {
                $scope.errorMessage = 'Enter a valid Phone Number';
            } else if ($scope.loginData.Password == undefined || $scope.loginData.Password == "") {
                $scope.errorMessage = 'Enter Password';
            } else {
                $scope.performLogin();
            }
        };

        $scope.$on('deviceRegistered', function(event) {
            $scope.loginData.DeviceId = LoginFactory.DeviceId;
            $scope.loginData.AppVersion = LoginFactory.AppVersion;
            if (localStorage.getItem("isLoggedIn")) {
                $scope.loginData.PhoneNumber = parseInt(localStorage.getItem("PhoneNumber"));
                $scope.loginData.Password = localStorage.getItem("Password");
                $scope.login();
            }
        });

        $scope.update = function() {
            window.location.href = "https://play.google.com/store/apps/details?id=com.sinope.www";
        };

        $scope.register = function() {
            $state.go('register');
        };

    });