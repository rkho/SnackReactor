var db = require('../config');
var Restaurant = require('./restaurant');
var User = require('./user');


var Rating = db.Model.extend({
  tableName: 'ratings',
  hasTimestamps: true,

  users: function(){
    return this.belongsTo(User);
  },
  
  restaurants: function(){
    return this.belongsTo(Restaurant);
  }

});


module.exports = Rating;