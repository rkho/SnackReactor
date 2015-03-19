'use strict';

angular.module('snackReactorApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'angularModalService',
  'snackReactor.auth'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
 
    $urlRouterProvider
      .otherwise('/');

    $stateProvider
     .state('main', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainCtrl'
    });

    $stateProvider
     .state('results', {
      url: '/results',
      templateUrl: 'app/results/results.html',
      controller: 'ResultsCtrl'
    });
     
     $stateProvider
     .state('restaurants', {
      url: '/restaurants',
      templateUrl: 'app/restaurants/restaurants.html',
      controller: 'RestaurantsCtrl'
    });

    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push(function($q, $location){ 
    return {
      response: function(response) {
       // do something on success
       return response;
       },
      responseError: function(response) {
        if (response.status === 401){
          // $location.url('/login');
          $scope.open();
        }
        return $q.reject(response);
        }
      }; 
    });

  });