var db = require('../config');
var User = require('./user');
var joinRestaurantsUsers = require('./restaurant_user')


var Organization = db.Model.extend({
  tableName: 'organizations',
  hasTimestamps: true,

  users: function(){
    return this.hasMany(User);
  },

  ratings: function(){
    return this.hasMany(joinRestaurantsUsers).through(User);
  },

  avgRatings: function(){
    return this.hasMany()
  }
  
});


module.exports = Organization;