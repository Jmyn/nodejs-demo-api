'use strict';

require('dotenv').config();
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var HttpStatus = require('http-status-codes');
var apis = require('./routes/api');
var student = require('./routes/student');
var teacher = require('./routes/teacher');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));


//app.use('/', routes);
app.use('/api', apis);
app.use('/student', student);
app.use('/teacher', teacher);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = HttpStatus.NOT_FOUND;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (process.env.NODE_ENV === 'dev') {
    app.use(function (err, req, res, next) {
        res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message, error: err });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message, error: {} });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});

module.exports = app;