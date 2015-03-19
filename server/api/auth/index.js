var express = require('express');
var passport = require('../../config/passport.config.js');
var router = express.Router();
var request = require('superagent');
var authenticate = require('../../components/utils.js').authenticate;

router.get('/logout', function(req, res){
  req.session.destroy(function(err){
    req.logout();
    res.redirect('/');
  });
});

router.get('/github',
  passport.authenticate('github'),
  function(req, res){
    // The request will be redirected to Github for authentication, so this
    // function will not be called.
});

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

router.post('/checkloggedin', function(req, res){
  res.send(req.isAuthenticated() ? req.user : false);
});

router.get('/logout', function(req, res){
  req.session.destroy(function(err){
    if (err) console.error('Error destroying session: ' + err);
    req.logout();
    res.redirect('/');
  });
});

router.get('/getgithuborgs', authenticate, function(req,res){
  request.get('https://api.github.com/user/orgs')
  .query({access_token: req.user.access_token})
  .end(function(err,gitres){
    if (err){
      console.error('Error fetching Github organizations: ' + err);
      res.status(500).send();
    }
    res.send({orgs: gitres.body}); // this is the list of organizations from github
  });
});

module.exports = router;