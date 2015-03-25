var db = require('../config');
var User = require('./user');
var Restaurant = require('./restaurant');


var Going = db.Model.extend({
  tableName: 'going',
  hasTimestamps: true,

  users: function(){
    return this.hasOne(User);
  },

  restaurants: function(){
    return this.hasMany(Restaurant);
  }
  
});


module.exports = Going;