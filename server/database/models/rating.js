var db = require('../config');
var Restaurant = require('./restaurant');
var User = require('./user');


var Rating = db.Model.extend({
  tableName: 'ratings',
  hasTimestamps: true,

  users: function(){
    return this.belongsTo(User);
  },
  
  restaurants: function(){
    return this.belongsTo(Restaurant);
  },

  // initalize and calculateAverage functions in case want to add ability to average ratings

  // initialize: function(){
  //   this.on('creating', function(){
  //     this.calculateAverage();
  //   }
  // },

  // calculateAverage: function(newRating){

  //   // 'this' should refer to the Orgs / Rests join table, but need to refer to a model

  //   // how to refer to the newRating?
  //   // var newRating = this.get('rating');

  //   var cumulativeRating = this.get('cumulativeRating');
  //   var newCumulative = cumulativeRating + newRating;
  //   this.set('cumulativeRating', newCumulative);

  //   var totalRatings = this.get('totalRatings');
  //   var newTotal = totalRatings += 1;
  //   this.set('totalRatings', newTotal);
    

  //   var newAverage = (newCumulative / newTotal);
  //   this.set('avg_rating', newAverage);

  // }

});


module.exports = Rating;