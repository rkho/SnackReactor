/**
 * Endpoints
 * POST    /going/create     ->  create
 */

'use strict';

var _ = require('lodash');
var places = require('../places/places');
var Restaurant = require('../../database/models/restaurant');
var utils = require('../../components/utils.js');
// var http = require('http');
var Restaurant = require('../../database/models/restaurant.js');
var User = require('../../database/models/user.js');
var Going = require('../../database/models/going.js');

exports.going = {
  // Create restuarant
  create: function(req, res) {

    //Delete any existing entries
    Going.where({ user_id: req.user.id }).destroy();
    
    new Going({
      user_id: req.user.id,
      restaurant_id: req.body.id,
    }).save()
    .then(function(){
      res.send(201, 'Created');
    });
  },

  list: function(req, res){
    var results = [];
    Restaurant.fetchAll({
      withRelated: ['going']
    }).then(function(restaurants){
      res.json(restaurants.toJSON());
    });
  }
};