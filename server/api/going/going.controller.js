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
		new Going({
		  user_id: req.user.id,
		  restaurant_id: req.body.id,
		}).save()
		.then(function(){
		  res.send(201, 'Created');
		});
  } //create

 

};