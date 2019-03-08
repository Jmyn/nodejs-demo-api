'use strict';
const db = require('../config/db');
const teacherService = require('../service/teacherService');
const studentService = require('../service/studentService');
const registryService = require('../service/registryService');
const suspensionService = require('../service/suspensionService');
const HttpStatus = require('http-status-codes');
const ApiResult = require('../model/ApiResult');

const commonStudentSql ='select p.email from student as s left join person as p on p.idperson = s.personid where ';
const commonStudentExistClause = ' exists (select * from registry as r where r.register_person_from = s.personid and r.register_person_to = ?) ';

exports.commonStudents = async function (teachers) {
    if (!Array.isArray(teachers)) {
        teachers = [teachers];
    }
    let sql = commonStudentSql;
    let teacherIds = [];

    for await (const [i, teacher] of teachers.entries())
    {
        sql = sql + commonStudentExistClause;
        if (i !== teachers.length - 1) {
            sql = sql + ' and ';
        }
        let id = await teacherService.getTeacherPersonId(teacher);
        if (!id) {
            return new ApiResult(HttpStatus.NOT_FOUND, 'Teacher does not exist: ' + teacher, {});
        }
        teacherIds.push(id);
    }
    
    let res = await db.pool.query(sql, teacherIds);
    let obj = { students: [] };
    let result = new ApiResult(HttpStatus.OK, '', obj);
    if (!res) {
        return result;
    }
    res.forEach((row) => obj.students.push(row.email));
    return result;
}

exports.register = async function (fromArray, to) {
    let studentPersonids = []
    let teacherPersonId = await teacherService.getTeacherPersonId(to);

    if (!teacherPersonId) {
        return new ApiResult(HttpStatus.NOT_FOUND, 'teacher does not exist: ' + to, {});
    }

    for await (const [i, from] of fromArray.entries()) {
        let studentPersonid = await studentService.getStudentPersonId(from);
        if (!studentPersonid) {
            return new ApiResult(HttpStatus.NOT_FOUND, 'student does not exist: ' + from, {});
        }
        let isRegistered = await registryService.isRegistered(studentPersonid, teacherPersonId);
        if (!isRegistered) {
            studentPersonids.push(studentPersonid);
        } 
    }

    var chain = db.getPromiseChain();
    chain.
        on('rollback', function (err) {
            console.log('rollback');
            console.log(err);
            return new ApiResult(HttpStatus.INTERNAL_SERVER_ERROR, 'db error encountered', {});
        });

    for await (const [i, studentPersonid] of studentPersonids.entries()) {
        await registryService.insertRegistry(chain, studentPersonid, teacherPersonId);
    }
    return new ApiResult(HttpStatus.NO_CONTENT, '', {});
}

exports.suspend = async function (email) {
    let studentPersonId = await studentService.getStudentPersonId(email);
    if (!studentPersonId) {
        return new ApiResult(HttpStatus.NOT_FOUND, 'student does not exist: ' + to, {});
    }

    let isSuspended = await suspensionService.isSuspended(studentPersonId);
    if (isSuspended) {
        return new ApiResult(HttpStatus.NO_CONTENT, email + ' is already suspended', {});
    }

    var chain = db.getPromiseChain();
    chain.
        on('rollback', function (err) {
            console.log('rollback');
            console.log(err);
            return new ApiResult(HttpStatus.INTERNAL_SERVER_ERROR, 'db error encountered', {});
        });

    await suspensionService.insertSuspension(chain, studentPersonId, new Date());
    return new ApiResult(HttpStatus.NO_CONTENT, '', {});
}

