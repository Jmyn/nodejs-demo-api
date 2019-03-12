'use strict';
const db = require('../config/db');
const util = require('util');

const sql = 'INSERT INTO registry (register_person_from, register_person_to) VALUES(?, ?)';

exports.insertRegistry = async function (fromId, toId, chain = null) {
    if (!chain) chain = db.getPromiseChain();
    let result = await chain.query[util.promisify.custom](sql, [fromId, toId]);
    return !result.insertId ? null : result.insertId;
}

exports.registerWithEmail = async function (from, to, chain = null) {
    if (!chain) chain = db.getPromiseChain();
    let result1 = await chain.query[util.promisify.custom]('select idperson from person where email = ?', [from]);
    let fromId = result1 ? result1.idperson : 0;
    if (!fromId) {
        console.log('invalid from');
        return null;
    }
    let result2 = await chain.query[util.promisify.custom]('select idperson from person where email = ?', [to]);
    let toId = result2 ? result2.idperson : 0;
    if (!toId) {
        console.log('invalid to : ' + to);
        return null;
    }
    let result = await chain.query[util.promisify.custom](sql, [fromId, toId]);
    return !result.insertId ? null : result.insertId;
}

exports.isRegistered = async function (fromId, toId) {
    let res = await db.pool.query('select idregistry from registry ' +
        ' where register_person_from = ? and register_person_to = ? ',
        [fromId, toId]);
    let notRegistered = !res[0];
    return !notRegistered;
}

exports.personsRegisteredTo = async function (toPersonId) {
    let res = await db.pool.query('select register_person_from from registry ' +
        ' where register_person_to = ? ',
        [toPersonId]);
    if (!res[0]) {
        return null;
    }
    res = res.map((x) => x.register_person_from);
    return res;
}
