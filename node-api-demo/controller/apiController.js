'use strict';
const apiService = require('../service/apiService');
const HttpStatus = require('http-status-codes');
const strutil = require('../util/stringUtil');

exports.register = function (req, res) {
    let teacher = req.body['teacher']; 
    let students = req.body['students'];
    if (!teacher || !strutil.isString(teacher) || !students || !Array.isArray(students)) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'invalid teacher or students parameter' });
        return;
    }
    (async () => {
        let result = await apiService.register(students, teacher);
        if (result.status === HttpStatus.OK) {
            res.status(HttpStatus.NO_CONTENT).send();
        } else {
            res.status(result.status).json({ message: result.message });
        }
        
    })().catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: String(err) }));
}

exports.commonstudents = function (req, res) {
    let teachers = req.query['teacher'];
    if (!teachers) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'invalid teacher parameter' });
        return;
    }
    (async () => {
        let result = await apiService.commonStudents(teachers);
        if (result.status === HttpStatus.OK) {
            res.status(HttpStatus.OK).json(result.response);
        } else {
            res.status(result.status).json({ message: result.message });
        }
        
    })().catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message, error: err }));
    return;
}

exports.suspend = function (req, res) {
    res.send('suspend');
}

exports.retrievefornotifications = function (req, res) {
    res.send('retrievefornotifications');
}
