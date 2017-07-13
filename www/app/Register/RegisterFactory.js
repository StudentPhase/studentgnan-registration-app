'use strict';

angular.module('sgRegistrationApp').factory('RegisterFactory', function($q, $http, LoginFactory) {
    var factory = {};

    var URL = LoginFactory.getBaseUrl();

    factory.register = function(obj) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: URL + '/student',
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