'use strict';
const db = require('../config/db');
const util = require('util');

const insertSql = 'INSERT INTO suspension (personid, suspend_startdate) VALUES (?,?);';

exports.insertSuspension = async function (personId, fromDate, chain = null) {
    if (!chain) chain = db.getPromiseChain();
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

exports.getSuspensions = async function () {
    let res = await db.pool.query('select personid from suspension ' +
        ' where suspend_enddate is null ');
    if (!res) {
        return null;
    }
    let ids = [];
    res.forEach((row) => ids.push(row.personid));
    return ids;
}
