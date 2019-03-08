'use strict';
const db = require('../config/db');

exports.getTeacherPersonId = async function (teacherEmail) {
    let res = await db.pool.query('select idperson from person as p ' +
        'where p.role = (select idperson_role from person_role where role_name = ?) ' +
        'and p.email = ?', ['teacher', teacherEmail]);
    if (!res[0]) {
        return null;
    }
    return res[0].idperson;
}