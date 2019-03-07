'use strict';
const db = require('../config/db');

exports.getTeacherId = async function (teacherEmail) {
    try {
        let res = await db.query('select idperson from person as p ' +
            'where p.role = (select idperson_role from person_role where role_name = ?) ' +
            'and p.email = ?', ['teacher', teacherEmail]);
        if (!res) {
            throw new Error('teacher not found');
        }
        return res[0].idperson;
    } catch (err) {
        throw new Error(err)
    }
}