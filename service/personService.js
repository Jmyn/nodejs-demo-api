'use strict';
const db = require('../config/db');
const util = require('util');

exports.getPersonEmail = async function (personId) {
    let res = await db.pool.query('select email from person where idperson = ? ', [personId]);
    if (!res[0]) {
        return null;
    }
    return res[0].email;
}