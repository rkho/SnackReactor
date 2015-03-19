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
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
 
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
  });