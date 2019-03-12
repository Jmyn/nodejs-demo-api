'use strict';

process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const HttpStatus = require('http-status-codes');
const studentService = require('../service/studentService');
const teacherService = require('../service/teacherService');
const registryService = require('../service/registryService');
const util = require('util');
const db = require('../config/db');

chai.use(chaiHttp);

describe('commonstudents',  () => {
    before(async () => { 
        await commonStudentScenario();
    });

    describe('test teacher not exist',  () => {
         it('it should return 404 status and teacher not exist message', async () => {
            let res = await chai.request(app)
                .get('/api/commonstudents?teacher=notexist@example.com');
            res.should.have.status(HttpStatus.NOT_FOUND);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
             res.body.message.substring(0, 22).should.equal('Teacher does not exist');
             
        });
    });
    describe('test common students under 1 teacher',  () => {
         it('it should return 200 status and list of students registered under the teacher', async () => {
            let res = await chai.request(app)
                .get('/api/commonstudents?teacher=teacherken%40example.com');
            res.should.have.status(HttpStatus.OK);
            res.body.should.be.a('object');
            res.body.should.have.property('students');
            res.body.students.should.be.a('array');
            res.body.students.length.should.be.equal(3);
        });
    });

    describe('test common students under 2 teacher',  () => {
         it('it should return 200 status and list of students registered under the teacher', async () => {
            let res = await chai.request(app)
                .get('/api/commonstudents?teacher=teacherken%40example.com&teacher=teacherjoe%40example.com');
            res.should.have.status(HttpStatus.OK);
            res.body.should.be.a('object');
            res.body.should.have.property('students');
            res.body.students.should.be.a('array');
            res.body.students.length.should.be.equal(2);
        });
    });
});

describe('register', () => {
    before(async () => {
        await registerScenario();
    });

    describe('test teacher not exist', () => {
        it('it should return 404 status and teacher not exist message', async () => {
            let req = {};
            req.teacher = 'notexist@example.com';
            req.students = ["commonstudent1@gmail.com", "commonstudent2@gmail.com"];
            let res = await chai.request(app)
                .post('/api/register')
                .send(req);
            res.should.have.status(HttpStatus.NOT_FOUND);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.substring(0, 22).should.equal('Teacher does not exist');

        });
    });

    describe('test student not exist', () => {
        it('it should return 404 status and student not exist message', async () => {
            let req = {};
            req.teacher = 'teacherken@example.com';
            req.students = ["notexist@gmail.com", "commonstudent2@gmail.com"];
            let res = await chai.request(app)
                .post('/api/register')
                .send(req);
            res.should.have.status(HttpStatus.NOT_FOUND);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.substring(0, 22).should.equal('student does not exist');

        });
    });

    describe('test register 1', () => {
        it('it should return 204 status', async () => {
            let teacherEmail = 'teacherken@example.com';
            let teacherid = await teacherService.getTeacherPersonId(teacherEmail);
            console.log(teacherid);
            let req = {};
            req.teacher = teacherEmail;
            req.students = ["student_only_under_teacher_ken@gmail.com"];
            let res = await chai.request(app)
                .post('/api/register')
                .send(req);
            res.should.have.status(HttpStatus.NO_CONTENT);

        });
    });

    describe('test register 2', () => {
        it('it should return 204 status', async () => {
            let teacherEmail = 'teacherken@example.com';
            let teacherid = await teacherService.getTeacherPersonId(teacherEmail);
            console.log(teacherid);
            let req = {};
            req.teacher = teacherEmail;
            req.students = ["commonstudent1@gmail.com", "commonstudent2@gmail.com"];
            let res = await chai.request(app)
                .post('/api/register')
                .send(req);
            res.should.have.status(HttpStatus.NO_CONTENT);

        });
    });
});

describe('suspend', () => {
    before(async () => {
        await suspendScenario();
    });

    describe('test student not exist', () => {
        it('it should return 404 status and student not exist message', async () => {
            let req = {};
            req.student = "notexist@gmail.com";
            let res = await chai.request(app)
                .post('/api/suspend')
                .send(req);
            res.should.have.status(HttpStatus.NOT_FOUND);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.substring(0, 22).should.equal('student does not exist');

        });
    });

    describe('test bad input', () => {
        it('it should return 400 status and message', async () => {
            let req = {};
            req.student = 1;
            let res = await chai.request(app)
                .post('/api/suspend')
                .send(req);
            res.should.have.status(HttpStatus.BAD_REQUEST);
            res.body.should.be.a('object');
            res.body.should.have.property('message');

        });
    });

    describe('test suspend 1', () => {
        it('it should return 204 status', async () => {
            let req = {};
            req.student = "student_only_under_teacher_ken@gmail.com";
            let res = await chai.request(app)
                .post('/api/suspend')
                .send(req);
            res.should.have.status(HttpStatus.NO_CONTENT);

        });
    });
    
});

describe('retrievefornotifications', () => {
    before(async () => {
        await retrievefornotificationsScenario();
    });

    describe('test teacher not exist', () => {
        it('it should return 404 status and teacher not exist message', async () => {
            let req = {};
            req.teacher = "notexist@example.com";
            req.notification = "Hello students! @commonstudent1@gmail.com @commonstudent2@gmail.com"
            let res = await chai.request(app)
                .post('/api/retrievefornotifications')
                .send(req);
            res.should.have.status(HttpStatus.NOT_FOUND);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.substring(0, 22).should.equal('teacher does not exist');

        });
    });

    describe('test bad input', () => {
        it('it should return 400 status and message', async () => {
            let req = {};
            req.teacher = 1;
            req.notification = "Hello students! @commonstudent1@gmail.com @commonstudent2@gmail.com"
            let res = await chai.request(app)
                .post('/api/retrievefornotifications')
                .send(req);
            res.should.have.status(HttpStatus.BAD_REQUEST);
            res.body.should.be.a('object');
            res.body.should.have.property('message');

        });
    });

    describe('test retrievefornotifications mention not exists student', () => {
        it('it should return 200 status and 1 student', async () => {
            let req = {};
            req.teacher = "teacherken@example.com";
            req.notification = "Hello students! @commonstudent1@gmail.com @commonstudent2@gmail.com"
            let res = await chai.request(app)
                .post('/api/retrievefornotifications')
                .send(req);
            res.should.have.status(HttpStatus.OK);
            res.body.should.be.a('object');
            res.body.should.have.property('recipients');
            res.body.recipients.should.be.a('array');
            res.body.recipients.length.should.be.equal(1);
        });
    });

    describe('test retrievefornotifications 1', () => {
        it('it should return 200 status and 3 students', async () => {
            let req = {};
            req.teacher = "teacherken@example.com";
            req.notification = "Hello students! @studentagnes@example.com @studentmiche@example.com"
            let res = await chai.request(app)
                .post('/api/retrievefornotifications')
                .send(req);
            res.should.have.status(HttpStatus.OK);
            res.body.should.be.a('object');
            res.body.should.have.property('recipients');
            res.body.recipients.should.be.a('array');
            res.body.recipients.length.should.be.equal(3);
        });
    });

    describe('test retrievefornotifications 2', () => {
        it('it should return 200 status and 1 students', async () => {
            let req = {};
            req.teacher = "teacherken@example.com";
            req.notification = "Hello students!"
            let res = await chai.request(app)
                .post('/api/retrievefornotifications')
                .send(req);
            res.should.have.status(HttpStatus.OK);
            res.body.should.be.a('object');
            res.body.should.have.property('recipients');
            res.body.recipients.should.be.a('array');
            res.body.recipients.length.should.be.equal(1);
        });
    });

});

var commonStudentScenario = async function () {
    let student1 = "commonstudent1@gmail.com";
    let student2 = "commonstudent2@gmail.com";
    let student3 = "student_only_under_teacher_ken@gmail.com";
    let teacher1 = "teacherken@example.com";
    let teacher2 = "teacherjoe@example.com";
    let chain = db.getPromiseChain();
    await studentService.deleteStudent(null,chain);
    await teacherService.deleteTeacher(null, chain);
    await studentService.addStudent(student1,chain);
    await studentService.addStudent(student2, chain);
    await studentService.addStudent(student3, chain);
    await teacherService.addTeacher(teacher1, chain);
    await teacherService.addTeacher(teacher2, chain);
    await registryService.registerWithEmail(student1, teacher1, chain);
    await registryService.registerWithEmail(student1, teacher2, chain);
    await registryService.registerWithEmail(student2, teacher1, chain);
    await registryService.registerWithEmail(student2, teacher2, chain);
    await registryService.registerWithEmail(student3, teacher1, chain);

}

var registerScenario = async function () {
    let student1 = "commonstudent1@gmail.com";
    let student2 = "commonstudent2@gmail.com";
    let student3 = "student_only_under_teacher_ken@gmail.com";
    let teacher1 = "teacherken@example.com";
    let chain = db.getPromiseChain();
    await studentService.deleteStudent(null, chain);
    await teacherService.deleteTeacher(null, chain);
    await teacherService.addTeacher(teacher1, chain);
    await studentService.addStudent(student1, chain);
    await studentService.addStudent(student2, chain);
    await studentService.addStudent(student3, chain);
}

var retrievefornotificationsScenario = async function () {
    let student1 = "studentagnes@example.com";
    let student2 = "studentmiche@example.com";
    let student3 = "studentbob@example.com";
    let teacher1 = "teacherken@example.com";
    let chain = db.getPromiseChain();
    await studentService.deleteStudent(null, chain);
    await teacherService.deleteTeacher(null, chain);
    await studentService.addStudent(student1, chain);
    await studentService.addStudent(student2, chain);
    await studentService.addStudent(student3, chain);
    await teacherService.addTeacher(teacher1, chain);
    await registryService.registerWithEmail(student3, teacher1, chain);

}

var suspendScenario = async function () {
    let student1 = "commonstudent1@gmail.com";
    let student2 = "commonstudent2@gmail.com";
    let student3 = "student_only_under_teacher_ken@gmail.com";
    let teacher1 = "teacherken@example.com";
    let teacher2 = "teacherjoe@example.com";
    let chain = db.getPromiseChain();
    await studentService.deleteStudent(null, chain);
    await teacherService.deleteTeacher(null, chain);
    await studentService.addStudent(student1, chain);
    await studentService.addStudent(student2, chain);
    await studentService.addStudent(student3, chain);
    await teacherService.addTeacher(teacher1, chain);
    await teacherService.addTeacher(teacher2, chain);
    await registryService.registerWithEmail(student1, teacher1, chain);
    await registryService.registerWithEmail(student1, teacher2, chain);
    await registryService.registerWithEmail(student2, teacher1, chain);
    await registryService.registerWithEmail(student2, teacher2, chain);
    await registryService.registerWithEmail(student3, teacher1, chain);

}