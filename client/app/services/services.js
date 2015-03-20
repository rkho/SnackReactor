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
    return $http.get('/user/getorgs/github')
    .success(function(data, status, headers, config){
      return data.orgs;
    })
    .error(function(data,status,headers,config){
      console.error('Error fetching Github organizations: ' + data);
    });
  };

  instance.setGithubOrg = function(orgId, orgLogin, $location){
    return $http.post('/user/setorg/github', {orgId: orgId})
    .success(function(data,status,headers,config){
      if (data.create) $location.path('/org/create').search({'github_login': orgLogin, 'github_id': orgId}); //send them to the create flow, preserving github org name
      else $location.path('/');
    })
    .error(function(data,status,headers,config){
      console.error('Error posting org: ' + data);
    })
  }

  instance.getGithubOrgInfo = function(login){
    $http.get('/user/token')
    .success(function(data, status, headers, config){
      var token = data.access_token;
    return $http.get('https://api.github.com/orgs/' + login, {
      headers: {
        'Authorization': 'token ' + token
      }
    })
      .success(function(data,status,headers,config){
        return data;
      }).error(function(data,status,headers,config){
        console.error('Error getting organization info from Github ' + data);
      });
    })
    .error(function(data, status, headers, config){
      console.error('Error getting Github authorization ' + data);
    });
    
  };

  return instance;

}]);
