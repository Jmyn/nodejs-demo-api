// config/config.js
'use strict'

const config = {
    dev: {
        db: {
            connectionLimit: 10,
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE
        },
        server: {
            host: '127.0.0.1',
            port: process.env.PORT
        }
    }
};
module.exports = config;