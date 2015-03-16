var db = require('../config');
var Restaurant = require('./restaurant');
var Organization = require('./organization')


var Rating = db.Model.extend({
  tableName: 'ratings',
  hasTimestamps: true,

  restaurants: function(){
    return this.hasMany(Restaurant);
  },

  organizations: function(){
    return this.belongsTo(Organization);
  }

});


module.exports = Rating;