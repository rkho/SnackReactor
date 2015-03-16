var GoogleLocations = require('google-locations');
var Promise = require('bluebird');
var locations = new GoogleLocations(process.env.GOOGLE_PLACES_API_KEY);
Promise.promisifyAll(locations);


exports.getDetails = function(placeID) {
  return locations.detailsAsync({placeid: placeID})
          .then(function(response){
            if (response.status !== 'OK') console.error('Error getting details for place ID: ' + placeID);
            return response.result;
          });
};

exports.getDetailsFromAddressAndName = function(address, name, distance) {
  distance = distance || 1600;
  return locations.searchByAddressAsync(
          {address: address, name: name, radius: 1600, rankby: 'prominence', maxResults: 3})
          // {address: address, name: name})
          .then(function(response){
            for (var i = 0; i < response.errors.length; i++){
              console.error('Error looking up place details: ' + response.errors[i]);
            }
            return response.details;
          });
};