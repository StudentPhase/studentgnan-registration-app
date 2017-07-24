'use strict';
angular.module('sgRegistrationApp')
    .controller('StudentDetailsController', function($scope, $state, StudentListFactory, ionicToast, $ionicListDelegate, $ionicPopup, ionicDatePicker) {
        $scope.student = StudentListFactory.selectedStudent;

        $scope.studentDetails = null;

        $scope.updatePhoneNumber = {
            StudentId: null,
            PhoneNumber: null
        };

        $scope.updateEmail = {
            StudentId: null,
            Email: null
        };

        $scope.updateAddress = {
            StudentId: null,
            Address: null
        };

        $scope.updateDOB = {
            StudentId: null,
            DateOfBirth: moment().format('YYYY-MM-DD')
        };

        var ipObj1 = {
            callback: function(val) { //Mandatory
                $scope.updateDOB.DateOfBirth = moment(val).format('YYYY-MM-DD');
                $scope.editDateOfBirth($scope.updateDOB.DateOfBirth);
            },
            from: new Date(1980, 0, 1), //Optional
            to: new Date(), //Optional
            setLabel: 'Update',
            titleLabel: 'Choose updated DOB',
            inputDate: new Date(), //Optional
            mondayFirst: false, //Optional
            closeOnSelect: false, //Optional
            templateType: 'popup' //Optional
        };

        $scope.openDateOfBirthPicker = function() {
            ionicDatePicker.openDatePicker(ipObj1);
        };

        $scope.getStudentDetails = function() {
            StudentListFactory.getStudentDetails($scope.student.Id)
                .then(function(success) {
                    if (success.data.Code != "S001") {
                        ionicToast.show(success.data.Message, 'bottom', false, 2500);
                    } else {
                        $scope.studentDetails = success.data.Data[0];
                    }
                }, function(error) {
                    ionicToast.show(error, 'bottom', false, 2500);
                });
        };

        $scope.sendMessage = function() {
            $state.go('menu.personalMessages', { StudentId: $scope.student.Id });
        };

        $scope.call = function(PhoneNumber) {
            var call = "tel:" + PhoneNumber;
            document.location.href = call;
        };

        $scope.editPhoneNumber = function(PhoneNumber) {
            var myPopup = $ionicPopup.show({
                template: '<input type="number" ng-model="updatePhoneNumber.PhoneNumber">',
                title: "Enter updated phone number",
                scope: $scope,
                buttons: [{
                        text: 'Cancel'
                    },
                    {
                        text: '<b>Update</b>',
                        type: 'button-custom',
                        onTap: function(e) {
                            if ($scope.updatePhoneNumber.PhoneNumber.length == 0 || $scope.updatePhoneNumber.PhoneNumber < 0) {
                                ionicToast.show('Please enter proper phone number', 'bottom', false, 2500);
                                e.preventDefault();
                            } else {
                                return $scope.updatePhoneNumber;
                            }
                        }
                    }
                ]
            });

            myPopup.then(function(res) {
                if (res == undefined) {
                    myPopup.close();
                } else {
                    $scope.updatePhoneNumber.NumberType = numberType;
                    $scope.updatePhoneNumber.StudentId = $scope.studentDetails.Id;
                    StudentListFactory.updatePhoneNumber($scope.updatePhoneNumber)
                        .then(function(success) {
                            if (success.data.Code != "S001") {
                                ionicToast.show(success.data.Message, 'bottom', false, 2500);
                            } else {
                                ionicToast.show('Successfully updated the phone number', 'bottom', false, 2500);
                                $ionicListDelegate.closeOptionButtons();
                                $scope.updatePhoneNumber.PhoneNumber = null;
                                $scope.updatePhoneNumber.StudentId = null;
                                $scope.getStudentDetails();
                                myPopup.close();
                            }
                        }, function(error) {
                            ionicToast.show(error, 'bottom', false, 2500);
                        });
                }
            });
        };

        $scope.editEmail = function(Email) {
            var myPopup = $ionicPopup.show({
                template: '<input type="email" ng-model="updateEmail.Email">',
                title: "Enter updated email",
                scope: $scope,
                buttons: [{
                        text: 'Cancel'
                    },
                    {
                        text: '<b>Update</b>',
                        type: 'button-custom',
                        onTap: function(e) {
                            if ($scope.updateEmail.Email == "" || $scope.updateEmail.Email == null) {
                                ionicToast.show('Please enter proper email', 'bottom', false, 2500);
                                e.preventDefault();
                            } else {
                                return $scope.updateEmail;
                            }
                        }
                    }
                ]
            });

            myPopup.then(function(res) {
                if (res == undefined) {
                    myPopup.close();
                } else {
                    $scope.updateEmail.StudentId = $scope.studentDetails.Id;
                    StudentListFactory.updateEmail($scope.updateEmail)
                        .then(function(success) {
                            if (success.data.Code != "S001") {
                                ionicToast.show(success.data.Message, 'bottom', false, 2500);
                            } else {
                                ionicToast.show('Successfully updated the email', 'bottom', false, 2500);
                                $ionicListDelegate.closeOptionButtons();
                                $scope.updateEmail.Email = null;
                                $scope.updateEmail.StudentId = null;
                                $scope.getStudentDetails();
                                myPopup.close();
                            }
                        }, function(error) {
                            ionicToast.show(error, 'bottom', false, 2500);
                        });
                }
            });
        };

        $scope.editAddress = function(Email) {
            var myPopup = $ionicPopup.show({
                template: '<textarea rows="5" ng-model="updateAddress.Address"></textarea>',
                title: "Enter updated email",
                scope: $scope,
                buttons: [{
                        text: 'Cancel'
                    },
                    {
                        text: '<b>Update</b>',
                        type: 'button-custom',
                        onTap: function(e) {
                            if ($scope.updateAddress.Address == "" || $scope.updateAddress.Address == null) {
                                ionicToast.show('Please enter proper address', 'bottom', false, 2500);
                                e.preventDefault();
                            } else {
                                return $scope.updateAddress;
                            }
                        }
                    }
                ]
            });

            myPopup.then(function(res) {
                if (res == undefined) {
                    myPopup.close();
                } else {
                    $scope.updateAddress.StudentId = $scope.studentDetails.Id;
                    StudentListFactory.updateAddress($scope.updateAddress)
                        .then(function(success) {
                            if (success.data.Code != "S001") {
                                ionicToast.show(success.data.Message, 'bottom', false, 2500);
                            } else {
                                ionicToast.show('Successfully updated the address', 'bottom', false, 2500);
                                $ionicListDelegate.closeOptionButtons();
                                $scope.updateAddress.Address = null;
                                $scope.updateAddress.StudentId = null;
                                $scope.getStudentDetails();
                                myPopup.close();
                            }
                        }, function(error) {
                            ionicToast.show(error, 'bottom', false, 2500);
                        });
                }
            });
        };

        $scope.editDateOfBirth = function(DateOfBirth) {
            $scope.updateDOB.StudentId = $scope.studentDetails.Id;
            $scope.updateDOB.DateOfBirth = moment($scope.updateDOB.DateOfBirth).format("YYYY-MM-DD");
            StudentListFactory.updateDateOfBirth($scope.updateDOB)
                .then(function(success) {
                    if (success.data.Code != "S001") {
                        ionicToast.show(success.data.Message, 'bottom', false, 2500);
                    } else {
                        ionicToast.show('Successfully updated the date of birth', 'bottom', false, 2500);
                        $ionicListDelegate.closeOptionButtons();
                        $scope.updateDOB.DateOfBirth = null;
                        $scope.getStudentDetails();
                    }
                }, function(error) {
                    ionicToast.show(error, 'bottom', false, 2500);
                });
        };

        $scope.resetPassword = function() {

            if ($scope.studentDetails.PhoneNumber == null || $scope.studentDetails.PhoneNumber == "") {
                ionicToast.show('To reset password, please update the Student Contact Number', 'bottom', false, 2500);
            } else {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Reset Password?',
                    template: 'Are you sure you want to reset password?'
                });
                confirmPopup.then(function(res) {
                    if (res) {
                        var obj = {
                            StudentId: $scope.studentDetails.Id,
                            PhoneNumber: $scope.studentDetails.PhoneNumber
                        };
                        StudentListFactory.resetPassword(obj)
                            .then(function(success) {
                                if (success.data.Code != "S001") {
                                    ionicToast.show(success.data.Message, 'bottom', false, 2500);
                                } else {
                                    ionicToast.show('Password reset successful. The new password is same as the Student Contact Number!', 'bottom', false, 2500);
                                    $scope.getStudentDetails();
                                }
                            }, function(error) {
                                ionicToast.show(error, 'bottom', false, 2500);
                            });
                    } else {
                        console.log('You are not sure');
                    }
                });
            }
        };

        $scope.getStudentDetails();
    });