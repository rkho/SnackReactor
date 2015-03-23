'use strict';

var app = angular.module('snackReactorApp');
//refactor to services
app.controller('MainCtrl', function ($scope, $http, $log,$document, ModalService,$location, SearchRestaurants, SharedData) {

  $scope.isLogged = false;
  $scope.priceClick = false;
  $scope.is1healthClick = false;
  $scope.is2healthClick = false;
  $scope.is3healthClick = false;
  $scope.is1priceClick = false;
  $scope.is2priceClick = false;
  $scope.is3priceClick = false;
  $scope.healthRank=1;
  $scope.priceRank=1;

  //empty array that will store three random objects.
  //used in our search function to generate results page.
  $scope.places = [];


  $scope.logout = function (){
    $scope.isLogged = !$scope.isLogged;
  };

  $scope.search = function (view){

    //save data in case we need to search again

    SharedData.set('health', $scope.healthRank);
    SharedData.set('price', $scope.priceRank);

    var dummyData = [{
    name: "Jingo McJangerson",
    address: "Happy Gilmore",
    message: "You're a tomato",
    url: "http://ww1.prweb.com/prfiles/2011/02/09/8979837/romantic%20French%20restaurant%20San%20Francisco.jpg"
  },
  {
    name: "Bingo McBangerson",
    address: "23 Shroots Lane",
    message: "I ate the potato",
    url: "http://www.inside-guide-to-san-francisco-tourism.com/image-files/sushi-restaurants-in-san-francisco-isobune-3.jpg"
  },
  {
    name: "Jill Dubb",
    address: "Happy Gilmore",
    message: "Something something tornado",
    url: "http://www.wanderplanet.com/wp-content/uploads/2011/02/sf_the_fairmont_san_francisco.jpg"
  }];

    SearchRestaurants($scope.healthRank,$scope.priceRank)
    .success(function(data, status, headers, config){
      console.log(data);
      console.log(dummyData);
      SharedData.set('results', data);
      // SharedData.set('results', dummyData);
      $location.path(view);
    })
    .error(function(data,status, headers, config){
      // SharedData.set('results', dummyData); // to test while the server function is broken
      // $location.path(view); //to test while the server function is broken

      //we should put a stateful error message here
      console.error(data);
    }); 

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
      SearchRestaurants.health = $scope.healthRank=1;

    }else{
      SearchRestaurants.health = $scope.healthRank=1;
    }
  }
  $scope.healthClick2 = function (){
    SearchRestaurants.health = $scope.healthRank=2;
    if ($scope.is3healthClick){
      $scope.is3healthClick = false;
      return;
    }
    if ($scope.is2healthClick && $scope.is1healthClick){
      $scope.is1healthClick = $scope.is2healthClick = false;
      SearchRestaurants.health = $scope.healthRank=1;
      return;
    }
    $scope.is1healthClick = true;
    $scope.is2healthClick = true;
  }
  $scope.healthClick3 = function (){
    SearchRestaurants.health = $scope.healthRank=3;
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
      SearchRestaurants.price= $scope.priceRank=1;
    }else{
      SearchRestaurants.price= $scope.priceRank=1;
    }
  }
  $scope.priceClick2 = function (){
    SearchRestaurants.price= $scope.priceRank=2;
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
    SearchRestaurants.price= $scope.priceRank=3;
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
