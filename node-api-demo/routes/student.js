﻿'use strict';
var express = require('express');
var router = express.Router();
var studentController = require('../controller/studentController');

router.post('/', studentController.insertStudent);

router.delete('/:email', studentController.deleteStudent);
module.exports = router;