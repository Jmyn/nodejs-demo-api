'use strict';
const db = require('../config/db');
const util = require('util');

exports.getTeacherPersonId = async function (teacherEmail) {
    let res = await db.pool.query('select idperson from person as p ' +
        'where p.role = (select idperson_role from person_role where role_name = ?) ' +
        'and p.email = ?', ['teacher', teacherEmail]);
    if (!res[0]) {
        return null;
    }
    return res[0].idperson;
}

exports.addTeacher = async function (teacherEmail, chain = null) {
    if (!chain) chain = db.getPromiseChain();

    let result = await chain.query[util.promisify.custom]('insert into person (email, role) values (?, ' +
        ' (select idperson_role from person_role where role_name = ?))', [teacherEmail, 'teacher']);
    if (result.insertId) {
        let personid = result.insertId;
        let result2 = await chain.query[util.promisify.custom]('insert into teacher (personid, hire_date) values (?, ?)',
            [personid, new Date()]);
        return !result2.insertId ? null : result2.insertId;
    }
    return null;
}

exports.deleteTeacher = async function (teacherEmail = null, chain = null) {
    if (!chain) chain = db.getPromiseChain();
    let deleteTeacherSql = 'delete from teacher '
    let deletePersonSql = 'delete from person '
    if (teacherEmail) {
        deleteTeacherSql += ' where personid = (select idperson from person where email = ?)';
        deletePersonSql += ' where email = ?';
        let result1 = await chain.query[util.promisify.custom](deleteTeacherSql, [teacherEmail]);
        let result2 = await chain.query[util.promisify.custom](deletePersonSql, [teacherEmail]);
        return result2.affectedRows;
    } else {
        deletePersonSql += ' where role = (select idperson_role from person_role where role_name = ?)'
        let result1 = await chain.query[util.promisify.custom](deleteTeacherSql);
        let result2 = await chain.query[util.promisify.custom](deletePersonSql, ['teacher']);
        return result2.affectedRows;
    }
}