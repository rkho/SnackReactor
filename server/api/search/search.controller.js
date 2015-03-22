/**
 * Endpoints
 * POST    /search    ->  query
 */

'use strict';

var _ = require('lodash');
var places = require('../places/places');
var Restaurant = require('../../database/models/restaurant');

exports.search = {
  // Issues a search to the DB
  query: function(req, res) {
    var price = req.body.price;
    var health = req.body.health;
    // var organization_id = req.user.organization_id;

    new Restaurant()
      .query({where: {price: price, health: health}}) // add organization_id here
      .query('orderByRaw', 'random()')
      .query('limit', '3')
      .fetchAll().then(function(model) {
        if (model) {
          res.send(200, model);
        } else {
          res.redirect(400, '/');
          console.log('An error has occured.');
        }
      });
  }
};
