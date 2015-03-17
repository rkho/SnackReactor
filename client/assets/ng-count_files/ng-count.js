angular.module('count', []);

angular.module('count')
  // You'll need to create a means of persistent counting between your three controllers

  // This controller will only be displaying the current count
  // In the view, it looks like: <h1> {{ count.number }} </h1>
  .controller('countCtrl', function($scope){
    $scope.count = {};
    $scope.count.number = 0;
  })
  // This controller will increment the count
  // In the view, the incrementing is done through ng-click as an expression: ng-click="count.number = count.number + 1"
  .controller('incrCtrl', function($scope){
    $scope.increment = function (){
      $scope.count.number++;
    }
  })
  // This controller will decrement the count
  // In the view, the decrementing is done through ng-click as a function: ng-click="decrement()"
  .controller('decrCtrl', function($scope){
    $scope.decrement = function (){
      $scope.count.number--;
    }
  });
