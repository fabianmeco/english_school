const fixtures = require('./student.fixture');

describe('student', function(){
    describe('[POST] /student', function(){
        it('Should create a new student', function(done){
            chai.request(app)
            .post('/student')
            .send(fixtures.post.student)
            .end(function(err, res){
                should.not.exist(err);
                res.body.should.be.an('object');
                done();
            })
        });
        it('Should\'t create a student with duplicated cid', function(done){
            chai.request(app)
            .post('/student')
            .send(fixtures.post.student)
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            })
        });
        it('Should\'t create a student with wrong format fields', function(done){
            chai.request(app)
            .post('/student')
            .send(fixtures.post.wrong_student)
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            })
        });
        it('Should\'t create a student with wrong email structure', function(done){
            chai.request(app)
            .post('/student')
            .send(fixtures.post.wrong_student_mail)
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
                res.body.name.should.be.equal('email');
                done();
            })
        });
        
        it('Should\'t create a student w/o required fields', function(done){
            chai.request(app)
            .post('/student')
            .send(fixtures.post.wrngflds_student)
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            })
        });        
    });   
   describe('[GET] /student', function(){
        it('Should get all the students', function(done){
            chai.request(app)
            .get('/student')
            .end(function(err, res){
                should.not.exist(err);
                expect(res).should.to.be.an('array');
                done();
            });
        });
        it('Should get the rooms that match the query', function(done){
            chai.request(app).get('/student?cid=1094533533').end(function(err, res){
                should.not.exist(err);
                done();
            });
        });        
    }); 
    describe('[GET] /student/:id', function(){
        it('Should get a student by its Id', function(done){
            chai.request(app)
            .get('/student/1')
            .end(function(err, res){
                should.not.exist(err);
                expect(res).should.to.be.an('object');
                done();
            });
        });
        it('Shouldn\'t get a student w/ wrong Id', function(done){
            chai.request(app).get('/student/666').end(function(err, res){
                should.not.exist(err);
                done();
            });
        });        
    });
    describe('[PUT] /student/:id', function(){
        it('Should update a student using its Id and correct properties', function(done){
            chai.request(app).put('/student/1').send(fixtures.put.student).end(function(err, res){
                should.not.exist(err);
                done();
            });
        });
        it('Should\'t update a student with wrong format fields', function(done){
            chai.request(app)
            .put('/student/1')
            .send(fixtures.post.wrong_student)
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            })
        });

        it('Should\'t update student w/ duplicated name', function(done){
            chai.request(app)
            .put('/student/2')
            .send(fixtures.post.student)
            .end(function(err,res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            })
        });        
    });   
    describe('[DELETE] /student/:id', function(){
        it('Should delete a student by its Id', function(done){
            chai.request(app)
            .delete('/student/1')
            .end(function(err, res){
                should.not.exist(err);
                done();
            })
        });
        it('Shouldn\'t delete a student using wrong Id', function(done){
            chai.request(app)
            .delete('/student/666')
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(404);
            })
        });
    });

});