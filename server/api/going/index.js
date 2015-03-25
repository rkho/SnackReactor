'use strict';

var express = require('express');
var controller = require('./going.controller');

var router = express.Router();

router.post('/create', controller.going.create);

module.exports = router;