'use strict';
angular.module('sgRegistrationApp')
    .controller('StudentListController', function($scope, $state, $ionicPopover, LoginFactory, StudentListFactory, ionicToast, $stateParams) {

        $scope.students = [];

        $scope.getAllStudentsInClass = function() {
            StudentListFactory.getAllStudents()
                .then(function(success) {
                    if (success.data.Code != "S001") {
                        ionicToast.show(success.data.Message, 'bottom', false, 2500);
                    } else {
                        $scope.students = success.data.Data;
                    }
                }, function(error) {
                    ionicToast.show(error, 'bottom', false, 2500);
                });
        };

        $scope.studentSelected = function(student) {
            StudentListFactory.selectedStudent = student;
            $state.go('menu.studentDetails');
        };

        $scope.getAllStudentsInClass();
    });