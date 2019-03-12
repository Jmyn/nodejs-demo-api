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

//describe('teacher', () => {
//    beforeEach(async () => { //Before each test we empty the database
//        await studentService.deleteStudent();
//        await teacherService.deleteTeacher();
//    });

//    describe('add teacher', () => {
//        it('it should add new student and return its id', async () => {
//            let req = {
//                email: 'testaddteacher@example.com'
//            }
//            chai.request(app)
//                .post('/teacher')
//                .send(req)
//                .end((err, res) => {
//                    res.should.have.status(HttpStatus.NO_CONTENT);
//                    //done();
//                });
//        });
//    });

//    describe('delete teacher', async () => {
//        it('it should delete a teacher', async () => {
//            let email = "testaddteacher@gmail.com";
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