const mysql = require('mysql');
const transaction = require('node-mysql-transaction');
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
pool.getConnection = util.promisify(pool.getConnection);

var trCon = transaction({
    // mysql driver set 
    connection: [mysql.createConnection, {
        host: config.db.host,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database
  }],
    // create temporary connection for increased volume of async work.
    // if request queue became empty, 
    // start soft removing process of the connection.
    // recommended for normal usage.
    dynamicConnection: 32,

    // set dynamicConnection soft removing time.
    idleConnectionCutoffTime: 1000,

    // auto timeout rollback time in ms
    // turn off is 0
    timeout: 600
});

var getPromiseChain = function () {
    var chain = trCon.chain();
    chain.query[util.promisify.custom] = (sql, params = null) => {
        return new Promise((resolve, reject) => {
            chain.query(sql, params).
                on('result', function (result) {
                    resolve(result);
                }).
                on('rollback', function (err) {
                    reject(err);
                });
        });
    };
    return chain;
}
module.exports.pool = pool;
module.exports.trCon = trCon;
module.exports.getPromiseChain = getPromiseChain;