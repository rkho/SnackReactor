'use strict';

var app = angular.module('snackReactorApp');
//refactor to services
app.controller('MainCtrl', function ($scope, $http, $log,$document, ModalService,$location) {

  $scope.isLogged = false;
  $scope.priceClick = false;
  $scope.is1healthClick = false;
  $scope.is2healthClick = false;
  $scope.is3healthClick = false;
  $scope.is1priceClick = false;
  $scope.is2priceClick = false;
  $scope.is3priceClick = false;
  $scope.healthRank= 1;
  $scope.priceRank = 1;

  //empty array that will store three random objects.
  //used in our search function to generate results page.
  $scope.places = [];


  $scope.logout = function (){
    $scope.isLogged = !$scope.isLogged;
  };

  $scope.search = function (view){
    //search query

    //reroute
    $location.path(view);
  }
  //Pardon the naive logic, just wanted to get this done.
  $scope.healthClick1 = function (){
    if ($scope.is1healthClick && ($scope.is2healthClick || $scope.is3healthClick)){
      $scope.is2healthClick = false;
      $scope.is3healthClick = false;
      $scope.is1healthClick = false;
    }
    $scope.is1healthClick = !$scope.is1healthClick;
    if ($scope.is1healthClick){
      $scope.healthRank=1;
    }else{
      $scope.healthRank=1;
    }
  }
  $scope.healthClick2 = function (){
    $scope.healthRank=2;
    if ($scope.is3healthClick){
      $scope.is3healthClick = false;
      return;
    }
    if ($scope.is2healthClick && $scope.is1healthClick){
      $scope.is1healthClick = $scope.is2healthClick = false;
      $scope.healthRank=1;
      return;
    }
    $scope.is1healthClick = true;
    $scope.is2healthClick = true;
  }
  $scope.healthClick3 = function (){
    $scope.healthRank=3;
    if ($scope.is1healthClick && $scope.is2healthClick && $scope.is3healthClick){
      $scope.is1healthClick = false;
      $scope.is2healthClick = false;
      $scope.is3healthClick = false;
      $scope.healthRank = 1;
      console.log($scope.healthRank);
      return;
    }
    $scope.is3healthClick = !$scope.is3healthClick;
    if ($scope.is1healthClick || $scope.is2healthClick || (!$scope.is1healthClick && !$scope.is2healthClick)){
      $scope.is1healthClick = true;
      $scope.is2healthClick = true;
      console.log($scope.healthRank);
      return;
    }
  }
  $scope.priceClick1 = function (){
    if ($scope.is1priceClick && ($scope.is2priceClick || $scope.is3priceClick)){
      $scope.is2priceClick = false;
      $scope.is3priceClick = false;
      $scope.is1priceClick = false;
    }
    $scope.is1priceClick = !$scope.is1priceClick;
    if ($scope.is1priceClick){
      $scope.priceRank=1;
    }else{
      $scope.priceRank=1;
    }
  }
  $scope.priceClick2 = function (){
    $scope.priceRank=2;
    if ($scope.is3priceClick){
      $scope.is3priceClick = false;
      return;
    }
    if ($scope.is2priceClick && $scope.is1priceClick){
      $scope.is1priceClick = $scope.is2priceClick = false;
      $scope.priceRank=1;
      return;
    }
    $scope.is1priceClick = true;
    $scope.is2priceClick = true;
  }
  $scope.priceClick3 = function (){
    $scope.priceRank=3;
    if ($scope.is1priceClick && $scope.is2priceClick && $scope.is3priceClick){
      $scope.is1priceClick = false;
      $scope.is2priceClick = false;
      $scope.is3priceClick = false;
      $scope.priceRank = 1;
      console.log($scope.priceRank);
      return;
    }
    $scope.is3priceClick = !$scope.is3priceClick;
    if ($scope.is1priceClick || $scope.is2priceClick || (!$scope.is1priceClick && !$scope.is2priceClick)){
      $scope.is1priceClick = true;
      $scope.is2priceClick = true;
      console.log($scope.priceRank);
      return;
    }
  }
});

app.controller('ModalCtrl', function ($scope, $modal, $log, CheckLoggedIn) {
  $scope.items = [];
  $scope.open = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      backdrop: 'static',
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

 CheckLoggedIn().then(function(result){

  if (!result.data){
    $scope.logout();
    //check current path
      //if current path is not "/", redirect to "/"
      //if current path is "/" continue to open the modal
    $scope.open();
  }
 });

});

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, CheckLoggedIn) {

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
