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

  $scope.open('md');

});

app.controller('4Ctrl', function ($scope, $modalInstance, items, OrgSelect, $location) {

  $scope.heartText = '';
  $scope.submitting = false;

  $scope.hoverHeart = function(value) {
    var heartText = {
      1: 'Junk food!',
      2: 'Any food will do.',
      3: 'Something healthy, please!',
      4: ''
    };
    $scope.heartText = heartText[value];
  };

  $scope.priceText = '';

  $scope.hoverPrice = function(value) {
    var priceText = {
      1: '$7 & Under',
      2: '$8 - $15',
      3: '$15 ++',
      4: ''
    };
    $scope.priceText = priceText[value];
  };


  $scope.isCollapsed = false;

  var search = $location.search();
 
  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
