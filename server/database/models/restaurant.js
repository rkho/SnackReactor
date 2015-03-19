var db = require('../config');
var Rating = require('./rating');


var Restaurant = db.Model.extend({
  tableName: 'restaurants',
  hasTimestamps: true,

// currently set to a hasMany relationship because there are many ratings for each restaurant
// however, this could be a hasOne relationship -- depends on when we calculate the avg rating for the rest
  ratings: function(){
    return this.hasMany(Rating);
  }

});


module.exports = Restaurant;