'use strict';

var app = angular.module('snackReactorApp');
//refactor to services

app.controller('CreateRestCtrl', function ($scope, $modal, $log, CheckLoggedIn, ModalService) {
  // $scope.items = [];

  $scope.open = function (size) {
    var modalInstance = $modal.open({
      templateUrl: '4.html',
      controller: '4Ctrl',
      size: size,
      // backdrop: 'static',
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    });
  };

  $scope.open('md');

});

app.controller('4Ctrl', function ($scope, $window, $modalInstance, items, OrgSelect, $location, CreateRestaurant) {

  $scope.submitting = false;

  $scope.isCollapsed = false;

  var search = $location.search();

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.successMessage = '';
  $scope.failureMessage = '';

  $scope.submitRestaurant = function(){
    $scope.submitting = true;
    $scope.successMessage = '';
    $scope.failureMessage = '';
    console.log();
    CreateRestaurant($scope.createRest.name, $scope.createRest.address, $scope.createRest.healthRating, $scope.createRest.priceRating, $scope.createRest.description, $scope.createRest.rating)
    .success(function(data, status, headers, config){
      $scope.submitting = false;
      $scope.successMessage = 'Restaurant created successfully, thanks!';
      $window.location.reload();
    })
    .error(function(data,status,headers,config){
      $scope.submitting = false;
      $scope.failureMessage = 'Error creating restaurant. Are you sure you have the correct address?';
      console.error('Error creating restaurant: ' + data);
    });
  };

  $scope.cancelButton = function() {
    $window.location.href = '/';
  };
});
