'use strict';

angular.module('snackReactorApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'angularModalService',
  'satellizer'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {
    $authProvider.loginRedirect = '/';
    $authProvider.logoutRedirect = '/';
    
    $authProvider.github({
      clientId: 'f4051af23aa885800dbd'
    });

    $authProvider.github({
      url: '/auth/github',
      authorizationEndpoint: 'https://github.com/login/oauth/authorize',
      redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
      scope: [],
      scopeDelimiter: ' ',
      type: '2.0',
      popupOptions: { width: 1020, height: 618 }
    });

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