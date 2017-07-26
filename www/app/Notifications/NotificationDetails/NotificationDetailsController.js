'use strict';
angular.module('sgRegistrationApp')
    .controller('NotificationDetailsController', function($scope, $state, NotificationsFactory, ionicToast, $ionicPopup, $ionicHistory, $sce) {

        $scope.notification = NotificationsFactory.selectedNotification;
        if ($scope.notification.VideoURL != "" || $scope.notification.VideoURL != null) {
            $scope.notification.VideoURL = $sce.trustAsResourceUrl($scope.notification.VideoURL);
        }

    });