// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('sgRegistrationApp', ['ionic',
    'ionic-datepicker',
    'ionic-toast',
    'ngCordova'
])

.run(function($ionicPlatform, $rootScope, $ionicLoading, $state, $ionicHistory, $cordovaNetwork, ionicToast, LoginFactory) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        $ionicPlatform.registerBackButtonAction(function(e) {
            if ($state.is('menu.home')) {
                if (confirm('Are you sure you want to Exit?')) {
                    ionic.Platform.exitApp();
                    return false;
                } else {
                    e.preventDefault();
                    return false;
                }
            } else if ($state.is('menu.emergency') || $state.is('menu.offerList') || $state.is('menu.notificationsList') || $state.is('menu.studentList') || $state.is('menu.addEmergencyContact') || $state.is('menu.createOffer') || $state.is('menu.sendNotification') || $state.is('menu.changePassword')) {
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('menu.home');
            } else {
                $ionicHistory.goBack();
            }
        }, 100);

        FCMPlugin.getToken(function(token) {
            LoginFactory.DeviceId = token;
            cordova.getAppVersion(function(version) {
                LoginFactory.AppVersion = version;
                $rootScope.$broadcast('deviceRegistered');
            });
        });

        FCMPlugin.onNotification(
            function(data) {
                if (data.wasTapped) {
                    //Notification was received on device tray and tapped by the user. 
                    console.log(data);
                } else {
                    //Notification was received in foreground. Maybe the user needs to be notified. 
                    console.log(JSON.stringify(data));
                }
            },
            function(msg) {
                console.log('onNotification callback successfully registered: ' + msg);
            },
            function(err) {
                console.log('Error registering onNotification callback: ' + err);
            });

    });

    $rootScope.$on('loading:show', function() {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-custom" icon="android"></ion-spinner>',
            animation: 'fade-in',
            showBackdrop: false,
        });
    });

    $rootScope.$on('loading:hide', function() {
        $ionicLoading.hide();
    });

}).config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push(function($rootScope) {
        return {
            request: function(config) {
                $rootScope.$broadcast('loading:show');
                return config;
            },
            requestError: function(requestError) {
                $rootScope.$broadcast('loading:hide');
                return requestError;
            },
            response: function(response) {
                $rootScope.$broadcast('loading:hide');
                return response;
            },
            responseError: function(rejection) {
                $rootScope.$broadcast('loading:hide');
                return rejection;
            }
        }
    });

    $stateProvider
        .state('login', {
            url: '/login',
            cache: false,
            templateUrl: 'app/Login/Login.html',
            controller: 'LoginController'
        })
        .state('register', {
            url: '/register',
            cache: false,
            templateUrl: 'app/Register/Register.html',
            controller: 'RegisterController'
        })
        .state('menu', {
            abstract: true,
            templateUrl: 'app/Sidemenu/Sidemenu.html',
            controller: 'SidemenuController'
        })
        .state('menu.home', {
            url: '/home',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'app/Home/Home.html',
                    controller: 'HomeController'
                }
            }
        })
        .state('menu.profile', {
            url: '/profile',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'app/Profile/Profile.html',
                    controller: 'ProfileController'
                }
            }
        })
        .state('menu.emergency', {
            url: '/emergency',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'app/Emergency/EmergencyContacts/EmergencyContacts.html',
                    controller: 'EmergencyContactsController'
                }
            }
        })
        .state('menu.addEmergencyContact', {
            url: '/addEmergencyContact',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'app/Emergency/AddContact/AddContact.html',
                    controller: 'AddContactController'
                }
            }
        })
        .state('menu.contactDetails', {
            url: '/contactDetails',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'app/Emergency/ContactDetails/ContactDetails.html',
                    controller: 'ContactDetailsController'
                }
            }
        })
        .state('menu.offerList', {
            url: '/offerList',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'app/Offers/OfferList/OfferList.html',
                    controller: 'OfferListController'
                }
            }
        })
        .state('menu.createOffer', {
            url: '/createOffer',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'app/Offers/CreateOffer/CreateOffer.html',
                    controller: 'CreateOfferController'
                }
            }
        })
        .state('menu.viewOffer', {
            url: '/viewOffer',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'app/Offers/ViewOffer/ViewOffer.html',
                    controller: 'ViewOfferController'
                }
            }
        })
        .state('menu.sendNotification', {
            url: '/sendNotification',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'app/Notifications/SendNotifications/Notifications.html',
                    controller: 'NotificationsController'
                }
            }
        })
        .state('menu.notificationsList', {
            url: '/notificationsList',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'app/Notifications/NotificationsList/NotificationsList.html',
                    controller: 'NotificationsListController'
                }
            }
        })
        .state('menu.notificationDetails', {
            url: '/notificationDetails',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'app/Notifications/NotificationDetails/NotificationDetails.html',
                    controller: 'NotificationDetailsController'
                }
            }
        })
        .state('menu.studentList', {
            url: '/studentList',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'app/StudentList/StudentList.html',
                    controller: 'StudentListController'
                }
            }
        })
        .state('menu.studentDetails', {
            url: '/studentDetails',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'app/StudentDetails/StudentDetails.html',
                    controller: 'StudentDetailsController'
                }
            }
        })
        .state('menu.changePassword', {
            url: '/changePassword',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'app/ChangePassword/ChangePassword.html',
                    controller: 'ChangePasswordController'
                }
            }
        });

    $urlRouterProvider.otherwise('/login');

});