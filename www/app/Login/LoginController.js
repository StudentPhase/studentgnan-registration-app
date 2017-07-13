'use strict';
angular.module('sgRegistrationApp')
    .controller('LoginController', function($scope, $state, LoginFactory) {

        $scope.loginData = {
            PhoneNumber: null,
            Password: '',
            DeviceId: null,
            AppVersion: LoginFactory.AppVersion,
            OperatingSystem: ionic.Platform.platform()
        };

        $scope.errorMessage = null;
        $scope.showUpdateButton = false;

        $scope.performLogin = function() {
            LoginFactory.login($scope.loginData)
                .then(function(success) {
                    if (success.data.Code == "E010") {
                        $scope.errorMessage = success.data.Message;
                        $scope.showUpdateButton = true;
                    } else if (success.data.Code != "S001") {
                        $scope.errorMessage = success.data.Message;
                    } else {
                        $scope.errorMessage = null;
                        $scope.showUpdateButton = false;
                        $state.go("menu.profile");
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
            $scope.loginData.AdminAppVersion = LoginFactory.AdminAppVersion;
            if (localStorage.getItem("isLoggedIn")) {
                $scope.loginData.PhoneNumber = parseInt(localStorage.getItem("PhoneNumber"));
                $scope.loginData.Password = localStorage.getItem("Password");
                $scope.login();
            }
        });

        $scope.update = function() {
            window.location.href = "https://play.google.com/store/apps/details?id=com.studentgnan.www";
        };

        $scope.register = function() {
            $state.go('register');
        };

    });