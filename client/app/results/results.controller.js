var app = angular.module('snackReactorApp')

app.controller('ResultsCtrl', function ($scope,CheckLoggedIn, $location) {




  //have to run checked in on each controller
  $scope.checkLogged = function () {
    CheckLoggedIn().then(function(result){
      if(!result.data){
        $location.path("/");
      }
    });
  }

  $scope.oneAtATime = true;
  
  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  //---------
  $scope.jerry = {restaurant:"Bob's Burgers",
                  rating: 5,
                  address: '1742 Mark Street',
                  text: 'This is the place to go to eat some stuff with some people.' }



});


app.controller('AddModal', function ($scope, $modal, $log, CheckLoggedIn) {
  $scope.items = [];

  $scope.open = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'restaurant.html',
      controller: 'FormCtrl',
      size: size,
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

});

app.controller('FormCtrl', function ($scope, $modalInstance, items, CheckLoggedIn) {

   $scope.test = function (something) {
    console.log(something);
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