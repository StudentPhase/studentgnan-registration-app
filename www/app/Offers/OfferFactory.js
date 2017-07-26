'use strict';

angular.module('sgRegistrationApp').factory('OfferFactory', function($q, $http, LoginFactory) {
    var factory = {
        selectedOffer: null
    };

    var URL = LoginFactory.getBaseUrl() + '/secure';

    factory.getAllOffers = function(categoryId) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: URL + '/offer/' + categoryId,
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

    factory.addOffer = function(obj) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: URL + '/offer',
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

    factory.sendOfferNotification = function(obj) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: URL + '/sendOfferNotification',
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

    factory.deleteOffer = function(obj) {
        var d = $q.defer();
        $http({
            method: 'DELETE',
            url: URL + '/offer',
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