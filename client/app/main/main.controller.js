'use strict';
//refactor to services
angular.module('snackReactorApp')
  .controller('MainCtrl', function ($scope, $http, $log,$document) {
    $scope.awesomeThings = [];
    $scope.isShown = false;
    $scope.priceClicked = false;
    $scope.healthClicked = false;
    $scope.isLogged = false;

    $scope.show = function () {
      alert("moo");
    };

    $scope.submit = function (){
      //format for search query
    }

    $scope.priceClick = function (){
      //use a boolean value to reflect the option of price being selected
      $scope.priceClicked = !$scope.priceClicked; 
    }
    $scope.healthClick = function (){
      //use a boolean value to reflect the option of health being selected
      $scope.healthClicked = !$scope.healthClicked;
      //if healthClicked is true, set the background color of the button to green
    }
    $scope.search = function (){
      //POST request goes here with specified parameters.
        
        //if price but !health, sort by price
          //submit query with given parameters using $scope.submit

        //if health but !price, sort by health
          //submit query with given parameters using $scope.submit

        //if both priceClicked and healthClicked, sort by 
        //price and health rating

    }
    $scope.login = function () {
      //when GitHub button clicked for authentication, submit a 
      //request to authenticate the user
        //if loggedIn, redirect to main screen ('main.html' with all buttons)

        //if credentials false, re-prompt
    }
});




// angular.module('snackReactorApp').controller('ModalDemoCtrl', function ($scope, $modal, $log) {
//   $scope.items = ['item1', 'item2', 'item3'];
//   $scope.open = function (size) {
//     var modalInstance = $modal.open({
//       templateUrl: 'myModalContent.html',
//       controller: 'ModalInstanceCtrl',
//       size: size,
//       resolve: {
//         items: function () {
//           return $scope.items;
//         }
//       }
//     });
//     modalInstance.result.then(function (selectedItem) {
//       $scope.selected = selectedItem;
//     }, function () {
//       $log.info('Modal dismissed at: ' + new Date());
//     });
//   };
// });
// // Please note that $modalInstance represents a modal window (instance) dependency.
// // It is not the same as the $modal service used above.

// angular.module('snackReactorApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {
//   $scope.items = items;
//   $scope.selected = {
//     item: $scope.items[0]
//   };
//   $scope.ok = function () {
//     $modalInstance.close($scope.selected.item);
//   };
//   $scope.cancel = function () {
//     $modalInstance.dismiss('cancel');
//   };
// });