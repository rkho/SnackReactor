var db = require('../config');
var Organization = require('./organization');
var Restaurant = require('./restaurant');


var joinOrgsRestaurants = db.Model.extend({
  tableName: 'orgs_restaurants',
  hasTimestamps: false,

  organizations: function(){
    return this.hasMany(Organization);
  },

  restaurants: function(){
    return this.hasMany(Restaurant);
  }
  
});


module.exports = joinOrgsRestaurants; 