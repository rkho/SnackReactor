var db = require('../config');
// need to require other folders here?

var Rating = db.Model.extend({
  tableName: 'ratings',
  hasTimestamps: true,
  link: function() {
    return this.belongsTo(Rating, 'user_id');
  }
});


module.exports = Rating;