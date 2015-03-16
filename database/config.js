// difference between sqlite / bookshelf / knex

// need to require knex here?
var Bookshelf = require('bookshelf');
var path = require('path');

var db = Bookshelf.initialize({
  client: 'sqlite3',
  connection: {
    host: 'process.env.DATABASE_HOST',
    // need to name...?
    user: 'fearlessSoup',
    password: 'password',
    database: 'snackreactordb',
    charset: 'utf8',
    // filename: path.join(__dirname, '../db/shortly.sqlite')
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

// join table -- this may be incorrect; probably doesn't need .select()
knex()
  .join(tableName, firstJoinColumn, '=', secondJoinColumn);

// example:
// knex('users')
//   .join('contacts', 'users.id', '=', 'contacts.user_id')
//   .select('users.id', 'contacts.phone')



module.exports = db;



