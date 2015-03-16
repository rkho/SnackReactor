var db = require('../config');
var User = require('./user');
var Rating = require('./rating')


var Organization = db.Model.extend({
  tableName: 'organizations',
  hasTimestamps: true,
  users: function(){
    return this.hasMany(User);
  },
  ratings: function(){
    return this.hasMany(Rating);
  }
});


module.exports = Organization;