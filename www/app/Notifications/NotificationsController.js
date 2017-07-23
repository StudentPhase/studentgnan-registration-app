'use strict';
angular.module('sgRegistrationApp')
    .controller('NotificationsController', function($scope, $state, ionicToast, NotificationsFactory, LoginFactory) {

        $scope.newNotification = {
            Title: null,
            Description: null
        };

        $scope.sendCustomNotification = function() {
            if ($scope.newNotification.Title == null || $scope.newNotification.Title == "" || $scope.newNotification.Description == "" || $scope.newNotification.Description == null) {
                ionicToast.show('Please enter a title and description to send', 'bottom', false, 2500);
            } else {
                NotificationsFactory.sendCustomNotification($scope.newNotification)
                    .then(function(success) {
                        if (success.data.Code != "S001") {
                            ionicToast.show(success.data.Message, 'bottom', false, 2500);
                        } else {
                            ionicToast.show('Notification sent Successfully', 'bottom', false, 2500);
                            $scope.newNotification.Title = "";
                            $scope.newNotification.Description = "";
                        }
                    }, function(error) {
                        ionicToast.show(error, 'bottom', false, 2500);
                    })
            }
        };
    });