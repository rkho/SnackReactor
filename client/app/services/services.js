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

.factory('OrgSelect', ['$http', function($http, $location){
  var instance = {}
  
  instance.getGithubOrgs = function(){
    return $http.get('/user/github/getorgs')
    .success(function(data, status, headers, config){
      return data.orgs;
    })
    .error(function(data,status,headers,config){
      console.error('Error fetching Github organizations: ' + data);
    });
  };

  instance.setGithubOrg = function(orgId, $location){
    return $http.post('/user/github/setorg', {orgId: orgId})
    .success(function(data,status,headers,config){
      if (data.create) $location.path('/org/create');
      else $location.path('/');
    })
    .error(function(data,status,headers,config){
      console.error('Error posting org: ' + data);
    })
  }

  return instance;

}]);