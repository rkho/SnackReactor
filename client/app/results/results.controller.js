var app = angular.module('snackReactorApp')

app.controller('ResultsCtrl', function ($scope,CheckLoggedIn, $location, SearchRestaurants,$state) {

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

  $scope.reshuffle = function () {

    //ideally, this should just call another request to the server 
    console.log(SearchRestaurants);

    SearchRestaurants.results = [{
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

  $state.reload();

  }

  $scope.restaurants = SearchRestaurants.results;




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