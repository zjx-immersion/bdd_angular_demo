'use strict';

/**
 * Created by jxzhong on 12/3/14.
 */


/**
 * @ngdoc function
 * @name bddTestExampleApp.controller:MainCtrl
 * @description
 * # MyCtrl
 * Controller of the bddTestExampleApp
 */

angular.module('bddTestExampleApp')
    .controller('MyCtrl', function($scope, $location) {
    $scope.isActive = function(route) {
        var oldRoute = $location.path();
        return route === oldRoute;
    };


});