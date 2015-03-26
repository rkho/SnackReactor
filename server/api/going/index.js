'use strict';

var express = require('express');
var controller = require('./going.controller');

var router = express.Router();

router.post('/create', controller.going.create);
router.get('/', controller.going.list);

module.exports = router;