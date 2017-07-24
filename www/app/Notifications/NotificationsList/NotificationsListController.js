'use strict';
angular.module('sgRegistrationApp')
    .controller('NotificationsListController', function($scope, $state, ionicToast, NotificationsFactory, LoginFactory) {

        $scope.notifications = [];

        $scope.getAllNotifications = function() {
            NotificationsFactory.getAllNotifications()
                .then(function(success) {
                    if (success.data.Code != "S001") {
                        ionicToast.show(success.data.Message, 'bottom', false, 2500);
                    } else {
                        $scope.notifications = success.data.Data;
                    }
                }, function(error) {
                    ionicToast.show(error, 'bottom', false, 2500);
                })
        };

        $scope.notificationSelected = function(notification) {
            NotificationsFactory.selectedNotification = notification;
            $state.go('menu.notificationDetails');
        };

        $scope.getAllNotifications();
    });