'use strict';

/**
 * @ngdoc overview
 * @name bddTestExampleApp
 * @description
 * # bddTestExampleApp
 *
 * Main module of the application.
 */
angular
  .module('bddTestExampleApp', [
    'ui.bootstrap',
//    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
//    'ngSanitize', put innerHTML to page by attribute "ng-bind-html"
//    'ngTouch',
    'ui.sortable',
    'ngTable',
//    'mgcrea.ngStrap',
    'LocalStorageModule'
  ])
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
        localStorageServiceProvider.setPrefix('ls');
    }])
//    .config(function($alertProvider) {
//        angular.extend($alertProvider.defaults, {
//            animation: 'am-fade-and-slide-top',
//            placement: 'top'
//        });
//    })
    .service('$flash', function($rootScope) {
        this.show = function(message) {
            $rootScope.flash = message;
        };

        this.clear = function() {
            $rootScope.flash = '';
        };
    })
    .factory('$session', function() {
        return {
            get: function(key) {
                return sessionStorage.getItem(key);
            },
            set: function(key, value) {
                return sessionStorage.setItem(key, value);
            },
            unset: function(key) {
                return sessionStorage.removeItem(key);
            },
            clear: function() {
                return sessionStorage.clear();
            }
        };
    })
  .service('AuthenticationService', function($location, $timeout, $q, $session, $flash) {

        this.login = function(credentials) {
            //var login = function(credentials){

                var users = [
                    {
                        id: 1,
                        username: 'admin',
                        password: 'pass',
                        role: 'ADMIN'
                    },
                    {
                        id: 2,
                        username: 'user',
                        password: 'pass',
                        role: 'USER'
                    }
                ];

                var successUser;

                for(var i = 0; i < users.length; i++){
                    var user = users[0];
                    if(user.username === credentials.username && user.password === credentials.password) {
                        successUser = user;
                        break;
                    }
                }

                if(successUser){
//                    this.success(successUser);
                    $session.set('user', successUser);
                    $flash.clear();
                }else{
                    //this.error(successUser);
                }
//            };
//            login.success(function(user) {
//                $session.set('user', user);
//                $flash.clear();
//            });
//            login.error(function(error) {
//                error = error.error ? error.error : error;
//                $flash.show(error.message || error);
//            });
            //return login;
        };


        this.logout = function() {
//            var logout = function(){
                $session.clear();
//            };
//            logout.success(function() {
//                $session.clear();
//            });
//            return logout;
        };

        this.user = function() {
            var user = $session.get('user');
            if (user) {
                var deferred = $q.defer();
                $timeout(function() {
                    deferred.resolve(user);
                }, 0);
                return deferred.promise;
            } else {
                $location.path('/login');
            }
        };
  })

  .run(function($rootScope, $location, AuthenticationService) {
        $rootScope.logout = function () {
            var logout = AuthenticationService.logout();
            logout.then(function() {
                $location.path('/login');
            });
            return logout;
        };
  })
  .run(function($rootScope, $location, AuthenticationService) {
        var publicRoutes = ['/login'];

        $rootScope.$on('$routeChangeStart', function() {
            if (publicRoutes.indexOf($location.path()) === -1) {
                AuthenticationService.user(); // http responseInterceptor will redirect to /login if this call fails
            }
        });
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
      .when('/home', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/slider1', {
            templateUrl: 'views/slider1.html',
            controller: 'SliderOneCtrl'
      })
      .when('/slider2', {
            templateUrl: 'views/slider2.html',
            controller: 'SliderTwoCtrl'
      })
      .when('/', {
        redirectTo: '/home'
      })
      .otherwise({
            templateUrl: '/login'
      });
  });
