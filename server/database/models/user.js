var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Organization = require('./organization');
var Rating = require('./rating');


var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  // if one entity belongs to another, need to write another line of code like:

        //   var Book = bookshelf.Model.extend({
        //     tableName: 'books',
        //     author: function() {
        //       return this.belongsTo(Author);
        //     }
        //   });

        //   // select * from `books` where id = 1
        //   // select * from `authors` where id = book.author_id
        //   Book.where({id: 1}).fetch({withRelated: ['author']}).then(function(book) {
        //     console.log(JSON.stringify(book.related('author')));
        //   });


  organizations: function(){
    return this.belongsTo(Organization, 'organization_id');
  },

  ratings: function(){
    return this.hasMany(Rating);
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
    return cipher(this.get('password'), null, null)
      .bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  }

});

module.exports = User;