'use strict';

/**
 * @ngdoc function
 * @name bddTestExampleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bddTestExampleApp
 */
angular.module('bddTestExampleApp')
  .controller('MainCtrl', function ($scope, localStorageService, $timeout) {
//        $scope.todos = ['Item 1', 'Item 2', 'Item 3'];

        var todosInStore = localStorageService.get('todos');

        $scope.todos = todosInStore || [];

        $scope.$watch('todos', function () {
            localStorageService.set('todos', $scope.todos);
        }, true);

        $scope.addTodo = function () {
//            $scope.todos.push($scope.todo);
//            $scope.todo = '';
            $scope.todos.push($scope.todo);
            $scope.todo = '';
//            $scope.$apply();
            addAlert();

        };

        $scope.alerts = [];

        var alerts = [
            { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.'},
            { type: 'success', msg: 'Well done! You successfully read this important alert message.'}
        ];

        var addAlert = function() {
            $scope.alerts.push(alerts[1]);
            $timeout(function(){
                closeAlert();
            }, 2000);
        };

        var closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        // Service usage
//        var myAlert = $alert({title: 'Add tips!',
//            content: 'Best check yo self, you\'re not looking too good.',
//            type: 'success',
//            keyboard: true,
//            duration: 2,
//            container: "body",
//            alert: "alert",
//            show: false});
//        $scope.showAlert = function() {
//            myAlert.toggle(); // or myAlert.$promise.then(myAlert.show) if you use an external html template
//        };


        $scope.removeTodo = function (index) {
            $scope.todos.splice(index, 1);
        };




  });
