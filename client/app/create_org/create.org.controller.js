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

  $scope.githubOrgs = [];
  
  OrgSelect.getGithubOrgs().then(function(result){
    // console.log(result);
    $scope.githubOrgs = result.data.orgs;
    $scope.githubOrgs.forEach(function(org){
      org.submitting = false;
    });
  });

  $scope.selectOrg = function(orgId, repeatScope){
    repeatScope.org.submitting = true;
    OrgSelect.setGithubOrg(orgId, $location)
    .then(function(){
      repeatScope.org.submitting = false;
    });
  };
 
  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
