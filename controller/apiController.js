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
        handleApiResult(result, res);
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
        handleApiResult(result, res);
    })().catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message, error: err }));
    return;
}

exports.suspend = function (req, res) {
    let personEmail = req.body['student'];
    if (!personEmail || !strutil.isString(personEmail)) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'invalid student parameter' });
        return;
    }
    (async () => {
        let result = await apiService.suspend(personEmail);
        handleApiResult(result, res);
    })().catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: String(err) }));
}

exports.retrievefornotifications = function (req, res) {
    let teacher = req.body['teacher'];
    let notification = req.body['notification'];

    if (!teacher || !strutil.isString(teacher) || !notification || !strutil.isString(notification)) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'invalid teacher or notification parameter' });
        return;
    }
    (async () => {
        let result = await apiService.retrievefornotifications(teacher, notification);
        handleApiResult(result, res);
    })().catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: String(err) }));
}

var handleApiResult = function(result, res)
{
    switch (result.status) {
        case HttpStatus.OK:
            res.status(HttpStatus.OK).json(result.response);
            break;
        case HttpStatus.NO_CONTENT:
            res.status(HttpStatus.NO_CONTENT).send();
            break;
        default:
            res.status(result.status).json({ message: result.message });
            break;
    }
}
