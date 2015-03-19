var db = require('../config');
var Restaurant = require('./restaurant');
var Organization = require('./organization');
var User = require('./user');


var Rating = db.Model.extend({
  tableName: 'ratings',
  hasTimestamps: true,

// same here -- currently set so that each rating belongs to many users, but this depends on when we calculate the average rating; seems like it would be easiest to recalculate the average every time a user rates a restaurant and then update the table with the new rating each time
// (alternative = calculate the average from all ratings in the table each time we display a restaurant; would be  expensive / inefficient to do it this way)
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