var passport = require('passport');
var User = require('../database/models/user.js');
var GithubStrategy = require('passport-github').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var request = require('superagent');


passport.serializeUser(function(user, done) {
    // done(null, user.get('id'));
    done(null,user);
});

passport.deserializeUser(function(id, done) {
  User.forge()
  .where({id: id})
  .fetch()
  .then(function(user){
    done(null,user.toJSON());
  });
  done(null,id);
});


var findOrCreateUserOauth = function (accessToken, refreshToken, profile, done, strategy){
  // User.forge()
  // .where({auth_type: strategy, auth_id: profile.id})
  // .fetch()
  // .then(function(user){
  //   if (!user){
  //     User.forge({
  //       email: null, // need to snag from pending table
  //       username: null,
  //       password: null,
  //       admin_level: 0,
  //       accessToken: accessToken,
  //       refreshToken: refreshToken,
  //       profile: profile,
  //       auth_type: strategy,
  //       auth_id: profile.id,
  //       invite_id: null // need to snag
  //     })
  //     .save()
  //     .then(function(user){
  //       return done(null,user);
  //     })
  //   } else {
  //     return done(null,user);
  //   }
  //below is temporary until database in place
  // });
  request.get('https://api.github.com/user/orgs')
  .query({access_token: accessToken})
  .end(function(err,res){
    // console.log(res.body); // this is the list of organizations
    // console.log(profile);
    return done(null,profile);
  })
};

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:9000/auth/github/callback",
    scope: 'read:org,user:email'
  },
  function(accessToken, refreshToken, profile, done) {
    findOrCreateUserOauth (accessToken, refreshToken, profile, done, 'github');
  }
));

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.forge()
//     .where({auth_type: 'local', username: username})
//     .fetch()
//     .then(function(user){
//       if (!user){
//           return done(null, false);
//         } else if(user.get('password') !== password) {
//             return done(null,false);
//           } else return done(null, user);
//     });
//   }
// ));


module.exports = passport;