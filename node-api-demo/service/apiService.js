'use strict';
const db = require('../config/db');
const teacherService = require('../service/teacherService');

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
        let id = await teacherService.getTeacherId(teacher);
        teacherIds.push(id);
    }
    
    let res = await db.query(sql, teacherIds);
    let obj = { students: [] };
    if (!res) {
        return obj;
    }
    res.forEach((row) => obj.students.push(row.email));
    return obj;
}
