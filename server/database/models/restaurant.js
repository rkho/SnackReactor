var db = require('../config');
var joinRestaurantsUsers = require('./restaurant_user');
var joinOrganizationsRestaurants = require('./organization_restaurant')


var Restaurant = db.Model.extend({
  tableName: 'restaurants',
  hasTimestamps: true,

  ratings: function(){
    return this.hasMany(joinRestaurantsUsers);
  },

// will this be hasOne or hasMany?
  avgRating: function(){
    return this.hasMany(joinOrganizationsUsers);
  }

});


module.exports = Restaurant;