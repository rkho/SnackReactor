var db = require('../config');
var joinRestaurantsUsers = require('./restaurant_user');
var joinOrganizationsRestaurants = require('./organization_restaurant')


var Restaurant = db.Model.extend({
  tableName: 'restaurants',
  hasTimestamps: true,

  ratings: function(){
    return this.hasMany(joinRestaurantsUsers);
  },

  avgRating: function(){
    return this.hasOne(joinOrganizationsUsers);
  }

});


module.exports = Restaurant;