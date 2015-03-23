/**
 * Endpoints
 * POST    /search    ->  query
 */

'use strict';

var _ = require('lodash');
var places = require('../places/places');
var Restaurant = require('../../database/models/restaurant');
var moment = require('moment');

exports.search = {
  // Issues a search to the DB
  query: function(req, res) {
    var price = req.body.price;
    var health = req.body.health;
    // var organization_id = req.user.organization_id;
    new Restaurant()
      .query(function(qb){
        qb.where('health', health).andWhere('price', '>=', price).orderByRaw('random()').limit(3);// add organization_id here
      }) 
      .fetchAll().then(function(models) {
        console.log(models);
        if (models.size()) {
          var results = [];
          models.forEach(function(model){
            results.push(model.toJSON());
          });
          res.send(200, results);
        } else {
          res.send(400, 'Error: No results returned from search.');
          console.error('No results returned from search.');
        }
      });
  }
};
