'use strict';

angular.module('snackReactor-services',[])

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

.factory('SearchRestaurants', ['$http', function($http, $location){
  var fns = {};

  fns.price=1;
  fns.health=1;

  fns.results = [{
    name: "Bob's Burgers",
    address: "1324 Place Drive",
    message: "I'm a potato",
    url: 'http://noehill.com/sf/landmarks/vanness/alhambra_theater_thumb.jpg'
  }, {
    name: "Chillin Con Carne",
    address: "1423 Valencia Escape",
    message: "There once was a man in Peru",
    url: 'http://upload.wikimedia.org/wikipedia/commons/4/44/Noeteca_Restaurant,_Dolores_St.,_San_Francisco,_CA.jpg'
  }, {
    name: "Desert Blues Café",
    address: "3331 Wakin Bakin Palace",
    message: "I had a mouse in his shoe",
    url: 'http://blog.pcbc.com/wp-content/uploads/2014/03/waterfront.jpg'
  }];

  return fns;
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

  instance.setGithubOrg = function(orgId, orgLogin, $location, $state){
    return $http.post('/user/setorg/github', {orgId: orgId})
    .success(function(data,status,headers,config){
      if (data.create){
        $location.path('/org/create').search({github_id: orgId, github_login: orgLogin}); //send them to the create flow, preserving github org name
      }
      else {
        $state.go('/').reload();
      }
    })
    .error(function(data,status,headers,config){
      console.error('Error posting org: ' + data);
    })
  }

  instance.getGithubOrgInfo = function(login, token){

    return $http.get('https://api.github.com/orgs/' + login, {
      headers: {
        'Authorization': 'token ' + token
      }
    })
    .success(function(data,status,headers,config){
        return data;
    })
    .error(function(data,status,headers,config){
        console.error('Error getting organization info from Github ' + data);
      });

  };

  instance.getAccessToken = function(){
    return $http.get('/user/token')
    .success(function(data, status, headers, config){
      return data.access_token;
    })
    .error(function(data, status, headers, config){
      console.error('Error getting Github authorization ' + data);
    });
  };

  instance.createOrg = function(github_id, address, name, github_login, placeId){
    placeId = placeId || null;
    return $http.post('/org/create/github', {
      github_id: github_id,
      address: address,
      name: name,
      github_login: github_login,
      placeId: placeId
    });
  }

  return instance;

}])

.factory('CreateRestaurant', ['$http', function($http){
    
    return function(name, address, health, price, description){
      console.log(name);
      return $http.post('/api/restaurants/new', {
        name: name,
        address: address,
        health: health,
        price: price,
        description: description
      });
    }

}]);