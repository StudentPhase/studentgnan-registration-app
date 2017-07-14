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
        });

    $urlRouterProvider.otherwise('/login');

});