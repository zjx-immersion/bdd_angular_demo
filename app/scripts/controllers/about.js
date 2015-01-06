'use strict';

/**
 * @ngdoc function
 * @name bddTestExampleApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bddTestExampleApp
 */

angular.module('bddTestExampleApp').controller('AboutCtrl', function ($scope, $modal, $log, $filter, ngTableParams) {

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.openCreate = function(size) {


         var openCreateModalInstance = $modal.open({
             templateUrl: 'createItem.html',
             controller: 'CreateItemCtrl',
             size: size,
             resolve: {
                 selectData: function () {
                     return $scope.selectData;
                 }
             }
         });

         openCreateModalInstance.result.then(function (user) {
             $scope.data.push(user);
             $scope.tableParams.reload();
         }, function () {
                     $log.info('Modal dismissed at: ' + new Date());
         });


    };

    $scope.open = function (size) {

        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };


    var data = [
        {name: 'Moroni', age: 50, sex: 'Female'},
        {name: 'Tiancum', age: 43, sex: 'Female'},
        {name: 'Jacob', age: 27, sex: 'Male'},
        {name: 'Nephi', age: 29, sex: 'Female'},
        {name: 'Enos', age: 34, sex: 'Female'}
    ];
    $scope.data = data;

    $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        filter: {
            //name: 'M'       // initial filter
        },
        sorting: {
            //name: 'asc'     // initial sorting
        }
         }, {
        total: data.length, // length of data
        getData: function ($defer, params) {
            // use build-in angular filter

            var filteredData = params.filter() ?
                $filter('filter')(data, params.filter()) :
                data;
            var orderedData = params.sorting() ?
                $filter('orderBy')(filteredData, params.orderBy()) :
                data;

            params.total(orderedData.length); // set total for recalc pagination
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    $scope.changeSelection = function(user) {
         console.info(user);
         if($scope.selectData){
             $scope.selectData.$selected = !$scope.selectData.$selected;
         }

         if($scope.selectData !== user){
         $scope.selectData = user;
         $scope.selectData.$selected = !$scope.selectData.$selected;
         }else{
             $scope.selectData = '';
         }
    };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('bddTestExampleApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});


angular.module('bddTestExampleApp').controller('CreateItemCtrl', function ($scope, $modalInstance, selectData) {

    $scope.sexEnums = [
        {ID: 1, Sex: 'Male'},
        {ID: 2, Sex: 'Female'}
    ];

    $scope.submitted = false;

    $scope.user = selectData;

    $scope.ok = function (valid) {

        $scope.submitted = true;
        if(valid) {
            $modalInstance.close($scope.user);
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});