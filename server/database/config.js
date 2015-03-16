var Bookshelf = require('bookshelf');
var path = require('path');

var db = Bookshelf.initialize({
  client: 'sqlite3',
  connection: {
    // host -- this is an environmental variable -- not sure if it's written correctly
    host: 'process.env.DATABASE_HOST',
    user: 'fearless_soup',
    // putting the password here does not seem secure...?
    password: 'password',
    database: 'snackreactordb',
    charset: 'utf8',
    // this is the example path that was in the shortly express config -- need to update
    filename: path.join(__dirname, '../db/shortly.sqlite')
  }
});


db.knex.schema.hasTable('restaurants').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('restaurants', function (place) {
      place.increments('id').primary();
      place.string('name');
      place.integer('price', 1);
      place.integer('health', 1);
      place.json('google_api_data');
      place.string('hours');
      place.string('geocode');
      place.text('description', text);
      place.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});


db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('organization').references('id').inTable('organizations');
      user.string('email').unique();
      user.string('username').unique();
      user.string('password');
      user.integer('admin_level', 1);
      user.string('access_token');
      user.string('refresh_token');
      user.json('profile');
      user.string('auth_type');
      user.string('auth_id');
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});


db.knex.schema.hasTable('ratings').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('ratings', function (rating) {
      rating.integer('rating', 1);
      rating.integer('user').references('id').inTable('users');
      rating.integer('restaurant').references('id').inTable('restaurants');
      rating.integer('organization').references('id').inTable('organizations');
      rating.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});


db.knex.schema.hasTable('organizations').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('organizations', function (org) {
      org.increments('id').primary();
      org.string('name', 50);
      org.integer('zip_code', 5);
      org.string('user').references('id').inTable('users');
      org.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});


module.exports = db;


