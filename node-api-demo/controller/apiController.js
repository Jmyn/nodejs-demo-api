'use strict';
const apiService = require('../service/apiService');
var HttpStatus = require('http-status-codes');

exports.register = function (req, res) {
    res.send('register');
}

exports.commonstudents = function (req, res) {
    let teachers = req.query['teacher'];
    if (!teachers) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'invalid teacher parameter' });
        return;
    }
    (async () => {
        let students = await apiService.commonStudents(teachers);
        res.status(HttpStatus.OK).json(students);
    })().catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: String(err) }));
    return;
}

exports.suspend = function (req, res) {
    res.send('suspend');
}

exports.retrievefornotifications = function (req, res) {
    res.send('retrievefornotifications');
}
