'use strict';
const db = require('../config/db');
const util = require('util');

exports.getStudentPersonId = async function (studentEmail) {
    let res = await db.pool.query('select idperson from person as p ' +
        'where p.role = (select idperson_role from person_role where role_name = ?) ' +
        'and p.email = ?', ['student', studentEmail]);
    if (!res[0]) {
        return null;
    }
    return res[0].idperson;
}

exports.getStudentEmail = async function (personId) {
    let res = await db.pool.query('select email from person as p ' +
        'where p.role = (select idperson_role from person_role where role_name = ?) ' +
        'and p.idperson = ?', ['student', personId]);
    if (!res[0]) {
        return null;
    }
    return res[0].email;
}

exports.getStudentEmails = async function (personId) {
    let res = await db.pool.query('select email from person as p ' +
        'where p.role = (select idperson_role from person_role where role_name = ?) ', ['student']);
    if (!res) {
        return null;
    }
    let students = [];
    res.forEach((row) => students.push(row.email));
    return students;
}

exports.addStudent = async function (studentEmail, chain = null) {
    if (!chain) chain = db.getPromiseChain();

    let result = await chain.query[util.promisify.custom]('insert into person (email, role) values (?, ' +
        ' (select idperson_role from person_role where role_name = ?))', [studentEmail, 'student']);
    if (result.insertId) {
        let personid = result.insertId;
        let result2 = await chain.query[util.promisify.custom]('insert into student (personid, enrol_date) values (?, ?)',
            [personid, new Date()]);
        return !result2.insertId ? null : result2.insertId;
    } 
    return null;
}

exports.deleteStudent = async function (studentEmail = null, chain = null) {
    if (!chain) chain = db.getPromiseChain();
    let deleteStudentSql = 'delete from student '
    let deletePersonSql = 'delete from person '
    if (studentEmail) {
        deleteStudentSql += ' where personid = (select idperson from person where email = ?)';
        deletePersonSql += ' where email = ?';
        let result1 = await chain.query[util.promisify.custom](deleteStudentSql, [studentEmail]);
        let result2 = await chain.query[util.promisify.custom](deletePersonSql, [studentEmail]);
        return result2.affectedRows;
    } else {
        deletePersonSql += ' where role = (select idperson_role from person_role where role_name = ?)'
        let result1 = await chain.query[util.promisify.custom](deleteStudentSql);
        let result2 = await chain.query[util.promisify.custom](deletePersonSql, ['student']);
        return result2.affectedRows;
    }
}