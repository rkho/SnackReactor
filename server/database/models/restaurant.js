var db = require('../config');
var Rating = require('./rating');


var Restaurant = db.Model.extend({
  tableName: 'restaurants',
  hasTimestamps: true,

  ratings: function(){
    return this.hasMany(Rating);
  }

});


module.exports = Restaurant;