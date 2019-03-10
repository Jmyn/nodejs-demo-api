//'use strict';

//process.env.NODE_ENV = 'test';
//const chai = require('chai');
//const chaiHttp = require('chai-http');
//const app = require('../app');
//const should = chai.should();
//const HttpStatus = require('http-status-codes');
//const studentService = require('../service/studentService');
//const teacherService = require('../service/teacherService');

//chai.use(chaiHttp);

//describe('student', () => {
//    beforeEach(async () => { //Before each test we empty the database
//        await studentService.deleteStudent();
//        await teacherService.deleteTeacher();
//    });

//    describe('add student', () => {
//        it('it should add new student and return its id', async () => {
//            let req = {
//                email : 'testaddstudent@example.com'
//            }
//            chai.request(app)
//                .post('/student')
//                .send(req)
//                .end((err, res) => {
//                    res.should.have.status(HttpStatus.NO_CONTENT);
//                    //done();
//                });
//        });
//    });

//    describe('delete student', async () => {
//        it('it should delete a student', async () => {
//            let email = "testdelete@gmail.com";
//            await studentService.addStudent(email);
//            chai.request(app)
//                .delete('/student/' + email)
//                .end((err, res) => {
//                    res.should.have.status(HttpStatus.OK);
//                    res.body.should.be.a('object');
//                    res.body.should.have.property('message');
//                    res.body.message.should.equal("affectedRow: 1");
//                });
//        });
//    });
//});