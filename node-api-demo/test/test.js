'use strict';

process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const HttpStatus = require('http-status-codes');
const studentService = require('../service/studentService');

chai.use(chaiHttp);

describe('commonstudents', () => {
    
    describe('test teacher not exist', () => {
        it('it should return 404 status and teacher not exist message', (done) => {
            chai.request(app)
                .get('/api/commonstudents?teacher=notexist@example.com')
                .end((err, res) => {
                    res.should.have.status(HttpStatus.NOT_FOUND);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.substring(0,22).should.equal('Teacher does not exist');
                    done();
                });
        });
    });

});

describe('student', () => {

    describe('add student', () => {
        it('it should add new student and return its id', (done) => {
            let req = {
                email : 'testaddstudent@example.com'
            }
            chai.request(app)
                .post('/student')
                .send(req)
                .end((err, res) => {
                    res.should.have.status(HttpStatus.NO_CONTENT);
                    done();
                });
        });
    });

});