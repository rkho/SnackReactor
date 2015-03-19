var Bookshelf = require('bookshelf');
var path = require('path');

var db = Bookshelf.initialize({
  client: 'sqlite3',
  connection: {
    // Change for production
    host: '127.0.0.1',
    // user: 'fearless_soup',
    // password: 'password',
    // database: 'snackreactordb',
    charset: 'utf8',
    filename: path.join(__dirname, './snackreactordb.sqlite')
  }
});

db.knex.schema.hasTable('restaurants').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('restaurants', function (place) {
      place.increments('id').primary();
      place.string('name');
      place.integer('price', 1);
      place.integer('health', 1);
      place.string('hours');
      place.string('address');
      place.float('location_lat');
      place.float('location_long');
      place.string('phone_number');
      place.string('place_id');
      place.string('photo_url');
      place.text('description');
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
      user.integer('org_id').references('id').inTable('organizations');
      user.string('email').unique();
      user.string('username').unique();
      user.string('password');
      user.integer('is_admin', 1);
      user.string('access_token');
      user.string('refresh_token');
      user.string('auth_type');
      user.string('auth_id');
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('restaurants_users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('ratings', function (rating) {
      rating.integer('rating', 1);
      rating.integer('user_id').references('id').inTable('users');
      rating.integer('rest_id').references('id').inTable('restaurants');
      rating.integer('has_visited', 1);
      rating.text('comments');
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
      org.string('name');
      org.string('address');
      org.string('place_id');
      org.string('github_id');
      org.json('github_profile');
      org.string('domain');
      org.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('orgs_restaurants').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('organizations', function (org) {
      org.integer('avg_rating');
      org.integer('org_id').references('id').inTable('organizations');
      org.integer('rest_id').references('id').inTable('restaurants');
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
