'use strict';

angular.module('sgRegistrationApp').factory('RegisterFactory', function ($q, $http) {
    var factory = {};

    var website = 'http://localhost:5000';
    // var website = 'https://studentgnan-api-dev.herokuapp.com';
    // var website = 'https://studentgnan-api.herokuapp.com';
    var URL = website;

    factory.register = function (obj) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: URL + '/student',
            data: obj,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (success) {
            d.resolve(success);
        }, function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return factory;
});