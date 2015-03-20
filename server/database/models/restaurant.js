var db = require('../config');
var Rating = require('./rating');
var Organization = require('./organization');
var Hour = require('./hour');


var Restaurant = db.Model.extend({
  tableName: 'restaurants',
  hasTimestamps: true,

  ratings: function(){
    return this.hasMany(Rating);
  },

  organizations: function(){
    return this.belongsToMany(Organization, 'organizations_restaurants', 'place_id', 'organization_id');
  },

  hours: function(){
    return this.hasMany(Hour);
  }

});


module.exports = Restaurant;