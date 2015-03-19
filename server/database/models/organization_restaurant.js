var db = require('../config');
var Organization = require('./organization');
var Restaurant = require('./restaurant');


var joinOrgsRestaurants = db.Model.extend({
  tableName: 'organizations_restaurants',
  hasTimestamps: false,

  organizations: function(){
    return this.belongsTo(Organization, 'org_id');
  },

  restaurants: function(){
    return this.belongsTo(Restaurant, 'restaurant_id');
  }
  
});


module.exports = joinOrgsRestaurants; 