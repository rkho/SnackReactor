var db = require('../config');
var Organization = require('./organization');
var Restaurant = require('./restaurant');


var joinOrgsRestaurants = db.Model.extend({
  tableName: 'organizations_restaurants',
  hasTimestamps: false,

  organizations: function(){
    return this.belongsTo(Organization);
  },

  restaurants: function(){
    return this.belongsTo(Restaurant, 'place_id');
  }
  
});


module.exports = joinOrgsRestaurants; 