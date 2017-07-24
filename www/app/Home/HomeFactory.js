'use strict';

angular.module('sgRegistrationApp').factory('HomeFactory', function($q, $http, LoginFactory) {
    var factory = {
        selectedCategory: null
    };

    var URL = LoginFactory.getBaseUrl();



    return factory;
});