'use strict';
var express = require('express');
var router = express.Router();
var apiController = require('../controller/apiController');

router.post('/register', apiController.register);

router.get('/commonstudents', apiController.commonstudents);

router.post('/suspend', apiController.suspend);

router.post('/retrievefornotifications', apiController.retrievefornotifications);

module.exports = router;