'use strict';
var express = require('express');
var router = express.Router();
var db = require('../config/db');

router.get('/', function (req, res, next) {
    db.query('SELECT * from student', function (error, results, fields) {
        if (error) {
            res.send(JSON.stringify({ "status": 500, "message": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({ "status": 200, "message": null, "response": results }));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

module.exports = router;
