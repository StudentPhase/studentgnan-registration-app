'use strict';

angular.module('sgRegistrationApp').factory('ProfileFactory', function($q, $http, LoginFactory) {
    var factory = {};

    var URL = LoginFactory.getBaseUrl();

    return factory;
});