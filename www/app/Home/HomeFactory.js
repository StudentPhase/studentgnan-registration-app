'use strict';

angular.module('sgRegistrationApp').factory('HomeFactory', function($q, $http, LoginFactory) {
    var factory = {
        selectedCategory: null
    };

    var URL = LoginFactory.getBaseUrl() + "/secure";

    factory.getAllSlides = function() {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: URL + '/bannerImage',
        }).then(function(success) {
            d.resolve(success);
        }, function(error) {
            d.reject(error);
        });
        return d.promise;
    };

    return factory;
});