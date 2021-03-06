'use strict';
angular.module('sgRegistrationApp')
    .controller('CreateOfferController', function($scope, $state, OfferFactory, ionicToast, $ionicHistory, $cordovaCamera) {

        $scope.newOffer = {
            Id: null,
            Title: null,
            Description: null,
            VideoURL: null,
            ImageBytes: null,
            Address: null,
            PhoneNumber: null,
            Website: null,
            OfferCode: null,
            CategoryId: null
        };

        $scope.categories = [];

        $scope.create = function() {
            if ($scope.newOffer.Title == "" || $scope.newOffer.Title == null ||
                $scope.newOffer.Description == "" || $scope.newOffer.Description == null ||
                $scope.newOffer.CategoryId == undefined || $scope.newOffer.CategoryId == null) {
                ionicToast.show('Please enter all the fields', 'bottom', false, 2500);
            } else {
                if ($scope.newOffer.VideoURL != "" && $scope.newOffer.VideoURL != null) {
                    $scope.newOffer.VideoURL = $scope.convertToEmbedURL($scope.newOffer.VideoURL);
                }
                OfferFactory.addOffer($scope.newOffer)
                    .then(function(success) {
                        if (success.data.Code != "S001") {
                            ionicToast.show(success.data.Message, 'bottom', false, 2500);
                        } else {
                            ionicToast.show('Offer created successfully', 'bottom', false, 2500);
                            $ionicHistory.nextViewOptions({
                                disableBack: true
                            });
                            $state.go('menu.home');
                        }
                    }, function(error) {
                        ionicToast.show(error, 'bottom', false, 2500);
                    });
            }
        };

        $scope.getAllCategories = function() {
            OfferFactory.getAllCategories()
                .then(function(success) {
                    if (success.data.Code != "S001") {
                        ionicToast.show(success.data.Message, 'bottom', false, 2500);
                    } else {
                        for (var i = 0; i < success.data.Data.length; i++) {
                            if (success.data.Data[i].CategoryType == "OFFER") {
                                $scope.categories.push(success.data.Data[i]);
                            }
                        }
                    }
                }, function(error) {
                    ionicToast.show(error, 'bottom', false, 2500);
                });
        };

        $scope.pickImage = function() {
            var options = {
                quality: 40,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                encodingType: Camera.EncodingType.JPEG,
            };
            $cordovaCamera.getPicture(options)
                .then(function(image) {
                        $scope.newOffer.ImageBytes = "data:image/jpeg;base64," + image;
                    },
                    function(err) {
                        console.log(err);
                    });
        };

        $scope.convertToEmbedURL = function(url) {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = url.match(regExp);

            if (match && match[2].length == 11) {
                return 'https://www.youtube.com/embed/' + match[2] + '?rel=0&amp;showinfo=0';
            } else {
                return 'error';
            }
        };

        $scope.getAllCategories();

    });