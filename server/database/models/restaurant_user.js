var db = require('../config');
var Restaurant = require('./restaurant');
var Organization = require('./organization');
var User = require('./user');


var Rating = db.Model.extend({
  tableName: 'restaurants_users',
  hasTimestamps: true,

  users: function(){
    return this.belongsTo(User);
  },
  
  restaurants: function(){
    return this.belongsTo(Restaurant);
  }

  // not necessary?  added another join table
  // organizations: function(){
  //   return this.belongsTo(Organization).through(User);
  // }

});


module.exports = Rating;