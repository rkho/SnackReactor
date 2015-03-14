var db = require('../config');
// need to require other folders here?

var Restaurant = db.Model.extend({
  tableName: 'restaurants',
  hasTimestamps: true,
  link: function() {
    return this.belongsTo(Restaurant, 'user_id');
  }
});


module.exports = Restaurant;