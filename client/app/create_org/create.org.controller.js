'use strict';

var app = angular.module('snackReactorApp');
//refactor to services

app.controller('CreateOrgCtrl', function ($scope, $modal, $log, CheckLoggedIn, ModalService) {
  $scope.items = [];

  $scope.open = function (size) {
    var modalInstance = $modal.open({
      templateUrl: '3.html',
      controller: '3Ctrl',
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

app.controller('3Ctrl', function ($scope, $modalInstance, items, OrgSelect, $location) {

  var search = $location.search();

  OrgSelect.getAccessToken()
  .then(function(response){
    OrgSelect.getGithubOrgInfo(search.github_login, response.data.access_token)
    .then(function(orgInfo){
      console.log(orgInfo.data);
      for (var key in orgInfo.data){
        $scope.createOrg[key] = orgInfo.data[key];
      }
    });
  });

  $scope.testFunc = function(){
    console.log('test');
  };

  console.log(OrgSelect);

  $scope.submitOrg = function(){
    OrgSelect.createOrg($scope.createOrg.id, $scope.createOrg.address, $scope.createOrg.name, $scope.createOrg.login, $scope.createOrg.placeId);
  };
 
  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
