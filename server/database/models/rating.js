var db = require('../config');
var Restaurant = require('./restaurant');
var Organization = require('./organization');
var User = require('./user');


var Rating = db.Model.extend({
  tableName: 'ratings',
  hasTimestamps: true,

  users: function(){
    return this.belongsToMany(User, 'user_id');
  },
  
  restaurants: function(){
    return this.belongsTo(Restaurant, 'restaurant_id');
  },

  organizations: function(){
    return this.belongsTo(Organization).through(User);
  }

});


module.exports = Rating;