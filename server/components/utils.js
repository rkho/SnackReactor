var OrganizationRestaurant = require('../database/models/organization_restaurant.js');
var Rating = require('../database/models/rating.js');

exports.authenticate = function(req, res, next){
  if (!req.isAuthenticated()) res.send(401);
  else next();
};

exports.calculateAvgRating = function(restaurantId, orgId){
  Rating.forge()
  .query(function(qb){
    qb.where({restaurant_id: restaurantId, organization_id: orgId})
    .avg('rating');
  })
  .then(function(avgRating){
    console.log('Calculate average: ' + avgRating);
    OrganizationRestaurant.forge({restaurant_id: restaurantId, organization_id: orgId})
    .then(function(orgRest){
      if (orgRest){
        orgRest.set('avg_rating', avgRating);
        orgRest.save();
      } else {
        OrganizationRestaurant.forge({
          organization_id: orgId,
          restaurant_id: restaurantId,
          avg_rating: avgRating
        })
        .save();
      }
    });
  });

};