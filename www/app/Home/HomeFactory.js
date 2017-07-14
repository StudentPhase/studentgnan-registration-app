'use strict';

angular.module('sgRegistrationApp').factory('HomeFactory', function($q, $http, LoginFactory) {
    var factory = {};

    var URL = LoginFactory.getBaseUrl();



    return factory;
});