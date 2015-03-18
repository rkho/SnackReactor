var db = require('../config');
var Restaurant = require('./restaurant');
var Organization = require('./organization');
var User = require('./user');


var Rating = db.Model.extend({
  tableName: 'ratings',
  hasTimestamps: true,

  users: function(){
    return this.belongsToMany(User);
  },
  
  restaurants: function(){
    return this.hasOne(Restaurant);
  },

  organizations: function(){
    return this.belongsTo(Organization);
  }

});


module.exports = Rating;