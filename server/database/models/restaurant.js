var db = require('../config');
var Rating = require('./rating');
var Organization = require('./organization');


var Restaurant = db.Model.extend({
  tableName: 'restaurants',
  hasTimestamps: true,

  ratings: function(){
    return this.hasMany(Rating);
  },

  organizations: function(){
    return this.belongsToMany(Organization, 'organizations_restaurants', 'place_id', 'organization_id');
  }

});


module.exports = Restaurant;