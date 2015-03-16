var db = require('../config');

var Organization = db.Model.extend({
  tableName: 'organizations',
  hasTimestamps: true,
});


module.exports = Organization;