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
    return $http({
      URL: 'https://api.github.com/orgs/' + login,
      method: GET,
      
    })
  }

  return instance;

}]);

request.get('https://api.github.com/orgs/' + req.body.github_login)
.query({access_token: req.user.access_token})
