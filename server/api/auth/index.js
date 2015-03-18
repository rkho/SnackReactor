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

router.post('/checkloggedin', function(req, res){
  if (req.isAuthenticated()){
    res.send(200);
  } else res.send(401);
})

module.exports = router;