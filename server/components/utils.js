exports.authenticate = function(req, res, next){
  console.log(req.user);
  if (!req.isAuthenticated()) res.send(401);
  else next();
};