'use strict';
angular.module('sgRegistrationApp').factory('StudentListFactory', function($q, $http, LoginFactory) {

    var URL = LoginFactory.getBaseUrl() + '/secure';

    var factory = {
        selectedStudent: null
    };

    factory.getAllStudents = function(studentId) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: URL + '/student'
        }).then(function(success) {
            d.resolve(success);
        }, function(error) {
            d.reject(error);
        });
        return d.promise;
    };

    factory.getStudentDetails = function(studentId) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: URL + '/student/getById/' + studentId
        }).then(function(success) {
            d.resolve(success);
        }, function(error) {
            d.reject(error);
        });
        return d.promise;
    };

    factory.updatePhoneNumber = function(obj) {
        var d = $q.defer();
        $http({
            method: 'PUT',
            url: URL + '/student/updatePhoneNumber',
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

    factory.updateEmail = function(obj) {
        var d = $q.defer();
        $http({
            method: 'PUT',
            url: URL + '/student/updateEmail',
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

    factory.updateAddress = function(obj) {
        var d = $q.defer();
        $http({
            method: 'PUT',
            url: URL + '/student/updateAddress',
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

    factory.resetPassword = function(obj) {
        var d = $q.defer();
        $http({
            method: 'PUT',
            url: URL + '/student/resetPassword',
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

    factory.updateDateOfBirth = function(obj) {
        var d = $q.defer();
        $http({
            method: 'PUT',
            url: URL + '/student/updateDateOfBirth',
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

    factory.deleteStudent = function(obj) {
        var d = $q.defer();
        $http({
            method: 'DELETE',
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