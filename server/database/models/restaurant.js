var db = require('../config');
var joinRestaurantsUsers = require('./restaurant_user');


var Restaurant = db.Model.extend({
  tableName: 'restaurants',
  hasTimestamps: true,

// TODO: review relationships
  ratings: function(){
    return this.hasMany(Rating);
  }

});


module.exports = Restaurant;