var db = require('../config');
// need to require other folders here?

var Organization = db.Model.extend({
  tableName: 'organizations',
  hasTimestamps: true,
  link: function() {
    return this.belongsTo(Organization, 'orgs_id');
  }
});


module.exports = Organization;