/**
 * Endpoints
 * POST    /restaurants/new     ->  create
 */

'use strict';

var _ = require('lodash');
var places = require('../places/places');
var Restaurant = require('../../database/models/restaurant');

exports.restaurants = {
  // Create restuarant
  create: function(req, res) {
    var place_id = req.body.place_id;
    var price = req.body.price;
    var health = req.body.health;
    var description = req.body.description;
    var organization_id = req.body.organization_id;

    // getDetails is a utility function created to interact with the Google Places API
    places.getDetails(place_id).then(function(details) {
      var newRestaurant = {
        name: details.name,
        price: price,
        health: health,
        hours: 1, // update with Bradley's parse function
        address: details.formatted_address,
        location_lat: details.geometry.location.lat,
        location_long: details.geometry.location.lng,
        phone_number: details.formatted_phone_number,
        place_id: place_id,
        photo_url: details.photos[0].photo_reference,
        description: description,
        // organization_id: organization_id
      };

      new Restaurant({place_id: details.place_id}).fetch().then(function(found) {
        if (found) {
          res.redirect(409, '/'); //Need to change route for production
          console.log('Restaurant has already been added.');
        } else {
          var restaurant = new Restaurant(newRestaurant);
          restaurant.save().then(function(model) {
            res.send(201, model);
            // res.redirect('/'); //Need to change route for production
          });
        }
      });
    });
  }
};
