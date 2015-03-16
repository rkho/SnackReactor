var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
// need to require other folders here? other tables that contain each other's foreign keys


var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  // is the line below, 'link', correct / necessary?
  link: function() {
    return this.belongsTo(User, 'user_id');
  },
  initialize: function(){
    this.on('creating', this.hashPassword);
  },
  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },
  hashPassword: function(){
    var cipher = Promise.promisify(bcrypt.hash);
    // return a promise - bookshelf will wait for  promise to resolve before completing create action
    return cipher(this.get('password'), null, null)
      .bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  }
});

module.exports = User;