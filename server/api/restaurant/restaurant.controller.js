/**
 * Endpoints
 * POST    /restaurants/new     ->  create
 */

'use strict';

var _ = require('lodash');
var places = require('../places/places');
var Restaurant = require('../../database/models/restaurant');
var Hour = require('../../database/models/hour');


exports.restaurants = {
  // Create restuarant
  create: function(req, res) {
    // var place_id = req.body.place_id; // should reenable if we get the autocomplete working on the front
    var price = req.body.price;
    var health = req.body.health;
    var description = req.body.description;
    var organization_id = req.user.organization_id;
    var name = req.body.name;
    var address = req.body.address;

    // getDetails is a utility function created to interact with the Google Places API
    places.getDetailsFromAddressAndName(address,name).then(function(details) {
      if (!details.length) {
        res.send(400, 'Failed to fetch restaurant details.');
        return;
      }
      var newRestaurant = {
        name: details[0].result.name,
        price: price,
        health: health,
        address: details[0].result.formatted_address,
        location_lat: details[0].result.geometry.location.lat,
        location_long: details[0].result.geometry.location.lng,
        phone_number: details[0].result.formatted_phone_number,
        place_id: details[0].result.place_id,
        photo_url: details[0].result.photos[0].photo_reference,
        description: description,
        // organization_id: organization_id
      };

      var hours = places.parseHours(details[0].result.opening_hours); //parse the opening hours object

      new Restaurant({place_id: details.place_id}).fetch().then(function(found) {
        if (found) {
          res.status(409).send('Restaurant already exists.');
          console.log('Restaurant has already been added.');
        } else {
          var restaurant = new Restaurant(newRestaurant);
          restaurant.save().then(function(model) {
            hours.forEach(function(period){
              new Hour({restaurant_id: model.get('id'), day: period[0], open: period[1], close: period[2]}).save();
            });
            res.send(201, model);
          });
        }
      });
    });
  }
};
