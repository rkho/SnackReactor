var db = require('../config');
var User = require('./user');
var Restaurant = require('./restaurant');


var Going = db.Model.extend({
  tableName: 'going',
  hasTimestamps: true,

  user: function(){
    return this.hasOne(User);
  },

  restaurant: function(){
    return this.hasOne(Restaurant);
  }
  
});


module.exports = Going;