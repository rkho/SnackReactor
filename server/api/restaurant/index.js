'use strict';

var express = require('express');
var controller = require('./restaurant.controller');

var router = express.Router();

router.post('/new', controller.restaurants.create);

module.exports = router;