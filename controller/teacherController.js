'use strict';
const teacherService = require('../service/teacherService');
const HttpStatus = require('http-status-codes');
const strutil = require('../util/stringUtil');

exports.insertTeacher = function (req, res) {
    let email = req.body['email'];
    if (!email || !strutil.isString(email)) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'invalid email parameter' });
        return;
    }
    (async () => {
        let result = await teacherService.addTeacher(email);
        if (result) {
            res.status(HttpStatus.NO_CONTENT).send();
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'error' });
        }
    })().catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: String(err) }));
}

exports.deleteTeacher = function (req, res) {
    let email = req.params['email'];
    if (!email) {
        res.status(HttpStatus.BAD_REQUEST).send();
    } else {
        (async () => {
            let result = await teacherService.deleteTeacher(email);
            res.status(HttpStatus.OK).json({ message: 'affectedRow: ' + result });
        })().catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: String(err) }));
    }
}

exports.getTeachers = function (req, res) {
    (async () => {
        let result = await teacherService.getTeacherEmails();
        res.status(HttpStatus.OK).json({ teachers: result });
    })().catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: String(err) }));
}