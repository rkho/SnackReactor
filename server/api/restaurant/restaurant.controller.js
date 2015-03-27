/**
 * Endpoints
 * POST    /restaurants/new     ->  create
 */

'use strict';

var _ = require('lodash');
var places = require('../places/places');
var Restaurant = require('../../database/models/restaurant');
var Hour = require('../../database/models/hour');
var Rating = require('../../database/models/rating');
var utils = require('../../components/utils.js');
var OrgRest = require('../../database/models/organization_restaurant.js');
var http = require('http');

exports.restaurants = {
  // Create restuarant
  create: function(req, res) {

    var place_id = req.body.place_id; // should reenable if we get the autocomplete working on the front
    var price = req.body.price;
    var health = req.body.health;
    var description = req.body.description;
    var organization_id = req.user.organization_id;
    var name = req.body.name;
    var address = req.body.address;
    var userRating = req.body.rating;

    // getDetails is a utility function created to interact with the Google Places API
    places.getDetailsFromAddressAndName(address,name).then(function(details) {

      if (!details.length) {
        res.send(400, 'Failed to fetch restaurant details.');
        return;
      }

      var place = details[0].result;
      var newRestaurant = {
        place_id:                 place.place_id,
        name:                     place.name,
        photo_url:                place.photos[0].photo_reference,
        location_lat:             place.geometry.location.lat,
        location_long:            place.geometry.location.lng,
        map_url:                  'https://www.google.com/maps/@' + place.geometry.location.lat + ',' + place.geometry.location.lng + ',16z',
        business_url:             place.website,
        address:                  place.formatted_address,
        phone_number:             place.formatted_phone_number,
        price:                    price,
        health:                   health,
        description:              description
      };

      // if (details[0].result.photos) newRestaurant.photo_url = details[0].result.photos[0].photo_reference;

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
            new Rating({
              restaurant_id: restaurant.get('id'),
              user_id: req.user.id,
              organization_id: req.user.organization_id,
              rating: req.body.rating
            }).save()
            .then(function(){
              utils.calculateAvgRating(restaurant.get('id'), req.user.organization_id); // calculate the first avg
            });
            res.send(201, model);
          });
        }
      });
    });
  }, //create

  rating: function(req,res){

    new Rating({restaurant_id: req.body.id, user_id: req.user.id, organization_id: req.user.organization_id})
    .fetch()
    .then(function(rating){
      if (rating){
        rating.set('rating', req.body.rating)
        .save().then(function(){
          res.send(201, 'Rating created: ' + req.body.rating);
          utils.calculateAvgRating(req.body.id, req.user.organization_id); // recalculate the average after a rating
        });
      } else {
        new Rating({
          restaurant_id: req.body.id,
          user_id: req.user.id,
          rating: req.body.rating,
          organization_id: req.user.organization_id
        }).save()
        .then(function(){
          res.send(201, 'Rating created: ' + req.body.rating);
          utils.calculateAvgRating(req.body.id, req.user.organization_id); // recalculate the average after a rating
        });
      }
    });
  }, //rating

  getRating: function(req,res){
    new OrgRest({restaurant_id: req.body.id, organization_id: req.user.organization_id})
    .fetch()
    .then(function(orgRest){
      console.log(orgRest);
      if (orgRest){
        console.log('if');
        res.send(200, {avgRating: orgRest.get('avg_rating')});
      } else {
        res.send(400, 'Error, no rating found');
      }
    });
  }

};
