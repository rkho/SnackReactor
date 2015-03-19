'use strict';

angular.module('snackReactor.auth',[])

.factory('CheckLoggedIn', ['$http', function($http){
  return function(){

    return $http.post('/auth/checkloggedin')
    .success(function(data, status, headers, config){
      return true;
    })
    .error(function(data, status, headers, config){
      return false;
    });
  };
}])

.factory('GetGithubOrgs', ['$http', function($http){
  return function(){
    return $http.get('/auth/getgithuborgs')
    .success(function(data, status, headers, config){
      console.log(data);
    })
    .error(function(data,status,headers,config){
      console.error('Error fetching Github organizations: ' + data);
    });
  };
}])

;