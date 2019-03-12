'use strict';
const studentService = require('../service/studentService');
const HttpStatus = require('http-status-codes');
const strutil = require('../util/stringUtil');

exports.insertStudent = function (req, res) {
    let email = req.body['email'];
    if (!email || !strutil.isString(email) ) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'invalid email parameter' });
        return;
    }
    (async () => {
        let result = await studentService.addStudent(email);
        if (result) {
            res.status(HttpStatus.NO_CONTENT).send();
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'error' });
        }
    })().catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: String(err) }));
}

exports.deleteStudent = function (req, res) {
    let email = req.params['email'];
    if (!email) {
        res.status(HttpStatus.BAD_REQUEST).send();
    } else {
        (async () => {
            let result = await studentService.deleteStudent(email);
            res.status(HttpStatus.OK).json({ message: 'affectedRow: ' + result });
        })().catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: String(err) }));
    }
}

exports.getStudents = function (req, res) {
    (async () => {
        let result = await studentService.getStudentEmails();
        res.status(HttpStatus.OK).json({ students: result });
    })().catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: String(err) }));
}