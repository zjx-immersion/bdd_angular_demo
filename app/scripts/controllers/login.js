'use strict';

angular.module('bddTestExampleApp')
    .controller('LoginCtrl', function ($scope, $location, AuthenticationService) {
        $scope.sampleUsers = [
            {
                username: 'admin',
                password: 'pass'
            },
            {
                username: 'user',
                password: 'pass'
            }
        ];

        $scope.login = function() {
            AuthenticationService.login(this.credentials);
//            AuthenticationService.login(this.credentials).success(function() {
                $location.path('/'); // TODO: route back to where user was coming from (before login page)
//            });
        };

        $scope.logout = function() {
            AuthenticationService.logout();
            $location.path('/');
        };
    });
/**
 * Created by jxzhong on 12/21/14.
 */
