'use strict';
var express = require('express');
var router = express.Router();
var teacherController = require('../controller/teacherController');

router.post('/', teacherController.insertTeacher);

router.get('/', teacherController.getTeachers);

router.delete('/:email', teacherController.deleteTeacher);
module.exports = router;