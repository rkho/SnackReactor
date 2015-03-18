var db = require('../config');
var User = require('./user');
var Rating = require('./rating')


var Organization = db.Model.extend({
  tableName: 'organizations',
  hasTimestamps: true,

  users: function(){
    return this.hasMany(User);
  },

  // this is where I need the .through() method I think
  ratings: function(){
    return this.hasMany(Rating);
  }
  
});


module.exports = Organization;