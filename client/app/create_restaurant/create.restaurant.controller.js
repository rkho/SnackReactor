'use strict';

var app = angular.module('snackReactorApp');

app.controller('CreateRestCtrl', function ($scope, $window, $http, $location, CreateRestaurant) {

  $scope.submitting = false;

  $scope.isCollapsed = false;

  var search = $location.search();

  // $scope.ok = function () {
  //   $modalInstance.close($scope.selected.item);
  // };

  // $scope.cancel = function () {
  //   $modalInstance.dismiss('cancel');
  // };

  $scope.successMessage = '';
  $scope.failureMessage = '';

  $scope.addRestaurant = function(object){
    CreateRestaurant(object.name, object.formatted_address)
      .success(function(data, status, headers, config){
        console.log('Hooray!');
      });
    $window.location.href = '/';
  };

  // $scope.submitRestaurant = function(){
  //   $scope.submitting = true;
  //   $scope.successMessage = '';
  //   $scope.failureMessage = '';
  //   console.log();
  //   CreateRestaurant($scope.createRest.name, $scope.createRest.address, $scope.createRest.healthRating, $scope.createRest.priceRating, $scope.createRest.description, $scope.createRest.rating)
  //   .success(function(data, status, headers, config){
  //     $scope.submitting = false;
  //     $scope.successMessage = 'Restaurant created successfully, thanks!';
  //     $window.location.reload();
  //   })
  //   .error(function(data,status,headers,config){
  //     $scope.submitting = false;
  //     $scope.failureMessage = 'Error creating restaurant. Are you sure you have the correct address?';
  //     console.error('Error creating restaurant: ' + data);
  //   });
  // };

  $scope.cancelButton = function() {
    $window.location.href = '/';
  };
});
