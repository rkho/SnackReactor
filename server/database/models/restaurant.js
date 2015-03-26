var db = require('../config');
var Rating = require('./rating');
var Organization = require('./organization');
var Hour = require('./hour');
var Going = require('./going');

var Restaurant = db.Model.extend({
  tableName: 'restaurants',
  hasTimestamps: true,

  ratings: function(){
    return this.hasMany(Rating);
  },

  going: function(){
    return this.hasMany(Going);
  },

  organizations: function(){
    return this.belongsToMany(Organization);
  },

  hours: function(){
    return this.hasMany(Hour);
  }

});


module.exports = Restaurant;