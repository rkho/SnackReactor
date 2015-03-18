'use strict';

var places = require('./places.js');
// var chaiAsPromised = require("chai-as-promised");
var Promise = require('bluebird');
var chai = require('chai')
  , expect = chai.expect
  , should = chai.should();

// chai.use(chaiAsPromised);

describe('Places Module', function() {

  it('should return the correct place for a search with address and name', function(done) {

    var address = '944 Market St #8, San Francisco, CA 94102';
    var name = 'Hack Reactor';

    places.getDetailsFromAddressAndName(address,name)
    .then(function(details){
      console.log(details[0].result.opening_hours);
      utils.parseHours(details[0].result.opening_hours);
      expect(details).to.be.an('array');
      var result = details[0].result;
      result.name.should.equal('Hack Reactor');
      result.formatted_phone_number.should.equal('(415) 547-0254');
      done();
    });
  });

  it('should return the correct place for a search by ID', function(done){
    places.getDetails('ChIJNc25vYWAhYARppFtCl9Stb0')
    .then(function(details){
      expect(details).to.be.an('object');
      expect(details.name).to.equal('Hack Reactor');
      done();
    });
  });

  it('should properly parse a Google Places opening hours object', function(){
    
  });

});
