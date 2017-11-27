const fixtures = require('./teacher.fixtures');
const teacherModel = require('./teacher.model');
describe('teacher', function () {
    before(function () {
        teacherModel.removeAll().then()
    })

    after(function () {
        teacherModel.removeAll().then()
    })
    describe('[POST] /teacher', function () {
        it('Should create a new teacher', function (done) {
            chai.request(app)
                .post('/teacher')
                .send(fixtures.post.teacher)
                .end(function (err, res) {
                    should.not.exist(err);
                    res.body.should.be.an('object');
                    done();
                })
        });
        it('Should\'t create a teacher with duplicated cid', function (done) {
            chai.request(app)
                .post('/teacher')
                .send(fixtures.post.teacher)
                .end(function (err, res) {
                    should.exist(err);
                    expect(res).to.have.status(422);
                    done();
                })
        });
        it('Should\'t create a teacher with wrong format fields', function (done) {
            chai.request(app)
                .post('/teacher')
                .send(fixtures.post.wrong_teacher)
                .end(function (err, res) {
                    should.exist(err);
                    expect(res).to.have.status(422);
                    done();
                })
        });
        it('Should\'t create a teacher with wrong email structure', function (done) {
            chai.request(app)
                .post('/teacher')
                .send(fixtures.post.wrong_student_mail)
                .end(function (err, res) {
                    should.exist(err);
                    expect(res).to.have.status(422);
                    done();
                })
        });
        it('Should\'t create a teacher under 18 yo', function (done) {
            chai.request(app)
                .post('/teacher')
                .send(fixtures.post.teacher_under18yo)
                .end(function (err, res) {
                    should.exist(err);
                    expect(res).to.have.status(422);
                    done();
                })
        });

        it('Should\'t create a teacher w/o required fields', function (done) {
            chai.request(app)
                .post('/teacher')
                .send(fixtures.post.wrngflds_student)
                .end(function (err, res) {
                    should.exist(err);
                    expect(res).to.have.status(422);
                    done();
                })
        });
    });
    describe('[GET] /teacher', function () {
        it('Should get all the students', function (done) {
            chai.request(app)
                .get('/teacher')
                .end(function (err, res) {
                    should.not.exist(err);
                    res.body.should.to.be.an('array');
                    done();
                });
        });
        it('Should get the rooms that match the query', function (done) {
            chai.request(app).get('/teacher?cid=1094533533').end(function (err, res) {
                should.not.exist(err);
                done();
            });
        });
    });
    describe('[GET] /teacher/:id', function () {
        it('Should get a teacher by its Id', function (done) {
            chai.request(app)
                .get('/teacher/1')
                .end(function (err, res) {
                    should.not.exist(err);
                    expect(res.body).should.to.be.an('object');
                    done();
                });
        });
        it('Shouldn\'t get a teacher w/ wrong Id', function (done) {
            chai.request(app).get('/teacher/666').end(function (err, res) {
                should.exist(err);
                done();
            });
        });
    });
    describe('[PUT] /teacher/:id', function () {
        it('Should update a teacher using its Id and correct properties', function (done) {
            chai.request(app).put('/teacher/1').send(fixtures.put.teacher).end(function (err, res) {
                should.not.exist(err);
                done();
            });
        });
        it('Should\'t update a teacher with wrong format fields', function (done) {
            chai.request(app)
                .put('/teacher/1')
                .send(fixtures.put.wrong_teacher)
                .end(function (err, res) {
                    should.exist(err);
                    expect(res).to.have.status(422);
                    done();
                })
        });

        it('Should\'t update teacher w/ duplicated name', function (done) {
            chai.request(app)
                .put('/teacher/2')
                .send(fixtures.put.teacher1)
                .end(function (err, res) {
                    should.exist(err);
                    expect(res).to.have.status(422);
                    done();
                })
        });
    });
    describe('[DELETE] /teacher/:id', function () {
        it('Should delete a teacher by its Id', function (done) {
            chai.request(app)
                .delete('/teacher/1')
                .end(function (err, res) {
                    should.not.exist(err);
                    done();
                })
        });
        it('Shouldn\'t delete a teacher using wrong Id', function (done) {
            chai.request(app)
                .delete('/teacher/666')
                .end(function (err, res) {
                    should.exist(err);
                    expect(res).to.have.status(404);
                    done();
                })
        });
    });

});