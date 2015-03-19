'use strict';

var app = angular.module('snackReactorApp');
//refactor to services
app.controller('MainCtrl', function ($scope, $http, $log,$document, ModalService) {
  $scope.awesomeThings = []; 
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

  //Upon clicking the 'Search' button:
    //Check the current session to see if user is logged in
      //If not logged in, open the modal, and authenticate via GitHub button.
        //redirect to results page
      //If logged in, submit a post request with priceClicked & healthClicked values specified
        //redirect to results page.
  $scope.open = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size
      ,resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    });
  };

  $scope.search = function (){
    console.log('made it');

   CheckLoggedIn().then(function(result){
    console.log(result);
    if (!result){
      $scope.open();
    } else if (result){
      //conduct search
        //redirect to result page
    }
   });
 }

});
app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.login = function (){
    alert("logged in");
  }

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
