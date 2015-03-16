var express = require('express');
var passport = require('../../config/passport.config.js');
var router = express.Router();

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

module.exports = router;