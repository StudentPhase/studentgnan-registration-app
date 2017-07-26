'use strict';

angular.module('sgRegistrationApp').factory('EmergencyContactFactory', function($q, $http, LoginFactory) {
    var factory = {
        selectedContact: null
    };

    var URL = LoginFactory.getBaseUrl() + '/secure';

    factory.getAllEmergencyContacts = function(categoryId) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: URL + '/emergencyContact/' + categoryId,
        }).then(function(success) {
            d.resolve(success);
        }, function(error) {
            d.reject(error);
        });
        return d.promise;
    };

    factory.getAllCategories = function() {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: URL + '/category',
        }).then(function(success) {
            d.resolve(success);
        }, function(error) {
            d.reject(error);
        });
        return d.promise;
    };

    factory.addEmergencyContact = function(obj) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: URL + '/emergencyContact',
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

    factory.deleteContact = function(obj) {
        var d = $q.defer();
        $http({
            method: 'DELETE',
            url: URL + '/emergencyContact',
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