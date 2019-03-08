'use strict';
const db = require('../config/db');
const util = require('util');

const sql = 'INSERT INTO registry (register_person_from, register_person_to) VALUES(?, ?)';

exports.insertRegistry = async function (chain, fromId, toId) {
    let result = await chain.query[util.promisify.custom](sql, [fromId, toId]);
    return !result.insertId ? result : result.insertId;
}