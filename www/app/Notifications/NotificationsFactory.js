'use strict';

angular.module('sgRegistrationApp').factory('NotificationsFactory', function($q, $http, LoginFactory) {
    var factory = {
        selectedNotification: null
    };

    var URL = LoginFactory.getBaseUrl() + '/secure';

    factory.getAllNotifications = function() {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: URL + '/getAllNotifications'
        }).then(function(success) {
            d.resolve(success);
        }, function(error) {
            d.reject(error);
        });
        return d.promise;
    };

    factory.sendCustomNotification = function(obj) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: URL + '/customNotification',
            data: obj,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(success) {
            d.resolve(success);
        }, function(error) {
            d.reject(error);
        });
        return d.promise;
    };

    return factory;
});