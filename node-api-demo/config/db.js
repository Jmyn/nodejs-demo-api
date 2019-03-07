const mysql = require('mysql');
const util = require('util');
var env = process.env.NODE_ENV || 'dev';
const config = require('../config/config')[env];

var pool = mysql.createPool({
    connectionLimit: config.db.connectionLimit,
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
});

pool.query = util.promisify(pool.query);

module.exports = pool;