'use strict';
const db = require('../config/db');
const util = require('util');

const insertSql = 'INSERT INTO suspension (personid, suspend_startdate) VALUES (?,?);';

exports.insertSuspension = async function (chain, personId, fromDate) {
    let result = await chain.query[util.promisify.custom](insertSql, [personId, fromDate]);
    return !result.insertId ? result : result.insertId;
}

exports.isSuspended = async function (personId) {
    let res = await db.pool.query('select idsuspension from suspension ' +
        ' where personid = ? and suspend_enddate is null ',
        [personId]);
    let notSuspended = !res[0];
    return !notSuspended;
}
