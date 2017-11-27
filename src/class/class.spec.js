const roomModel= require('../room/room.model');
const teacherModel = require('../teacher/teacher.model');
const fixtures = require('./class.fixtures');
const classModel = require('./class.model');



describe('class', function(){
    before(function(){
        return Promise.all([
            roomModel.removeAll(),
            teacherModel.removeAll()
        ])
        .then(()=>Promise.all([
            Promise.all(fixtures.rooms.map((room)=>roomModel.create(room))),
            Promise.all(fixtures.teachers.map((teachers)=>teacherModel.create(teachers)))
        ]))
    })

    after(function(){
        return Promise.all([
            roomModel.removeAll(),
            teacherModel.removeAll(),
            classModel.removeAll()
        ])
    })

    describe('[POST] /class', function(){
        it('Should create a new class', function(done){
            chai.request(app)
            .post('/class')
            .send(fixtures.post.newclass)
            .end(function(err, res){
                should.not.exist(err);
                should.exist(res);
                res.body.should.be.an('object');
                done();
            });            
        });
        it('Should\'t create a new class w/o existent room', function(done){
            chai.request(app)
            .post('/class')
            .send(fixtures.post.classNoExistingRoom)
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(404);
                done();
            });
        });
        it('Should\'t create a new class w/o existent teacher', function(done){
            chai.request(app)
            .post('/class')
            .send(fixtures.post.classNoRegTeacher)
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(404);
                done();
            });
        });        
        it('Should\'t create a new class at same time in the same room', function(done){
            chai.request(app)
            .post('/class')
            .send(fixtures.post.classSameRoomAndHour)
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            });
        });
        it('Should\'t create a new class with the same teacher at same', function(done){
            chai.request(app)
            .post('/class')
            .send(fixtures.post.classSameTeacherHour)
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            });
        });
        it('Shouldn\'t create a new class with past schedule', function(done){
            chai.request(app)
            .post('/class')
            .send(fixtures.post.classPastSchedule)
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            });
        });
        it('Shouldn\'t create a new class on holidays', function(done){
            chai.request(app)
            .post('/class')
            .send(fixtures.post.classOnHoliday)
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            })
        });
        it('Shouldn\'t create a new class with wrong input format', function(done){
            chai.request(app)
            .post('/class')
            .send(fixtures.post.classWrongFormat)
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            })
        });
        it('Shouldn\'t create a new class w/o required fields', function(done){
            chai.request(app)
            .post('/class')
            .send(fixtures.post.classWithoutRequired)
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            });
        });
        it('Shouldn\'t create a new class with wrong schedule hours (7am-11am and 2pm-8pm)', function(done){
            chai.request(app)
            .post('/class')
            .send(fixtures.post.classWrongHour)
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            });
        });
    });
    describe('[GET] /class', function(){
        it('Should get all the class', function(done){
            chai.request(app)
            .get('/class')
            .end(function(err, res){
                should.not.exist(err);
                expect(res).to.have.status(200);
                res.body.should.to.be.an('array')
                done();
            });
        });
        it('Should get classes that matches a query', function(done){
            chai.request(app)
            .get('/class?teacher_id=1')
            .end(function(err, res){
                should.not.exist(err);
                done();
            });
        });
        it('Shouldn\'t get classes with wrong query', function(done){
            chai.request(app)
            .get('/class?perro=1')
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            });
        });
    });    
    describe('[PUT] /class/:id', function(){
        it('Should update a class by its Id with correct fields', function(done){
            chai.request(app)
            .put('/class/1')
            .send(fixtures.put.classRight)
            .end(function(err, res){
                should.not.exist(err);
                done();
            });
        });
        it('Should\'t update a class with unregistered existing room', function(done){
            chai.request(app)
            .put('/class/1')
            .send(fixtures.post.classNoExistRoom)
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            });
        });
        it('Should\'t update a new class having the same time in the same room', function(done){
            chai.request(app)
            .put('/class/1')
            .send(fixtures.post.classSameRoomAndHour)
            .end(function(err, res){
                should.exists(err);
                expect(res).to.have.status(422);
                done();
            });
        });
        it('Should\'t update a new class with the same teacher at same hour', function(done){
            chai.request(app)
            .put('/class/1')
            .send(fixtures.post.classSameTeacherHour)
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            });
        });
        it('Shouldn\'t update a new class with past schedule', function(done){
            chai.request(app)
            .put('/class/1')
            .send(fixtures.post.classPastSchedule)
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            });
        });
        it('Shouldn\'t update a new class on holidays', function(done){
            chai.request(app)
            .put('/class/1')
            .send(fixtures.post.classOnHoliday)
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            })
        });
        it('Shouldn\'t update a new class w/ wrong input format', function(done){
            chai.request(app)
            .put('/class/1')
            .send(fixtures.post.classWrongFormat)
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            })
        });
        it('Shouldn\'t create a new class w/o required fields', function(done){
            chai.request(app)
            .putt('/class/1')
            .send(fixtures.post.classWithoutRequired)
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            });
        });
        it('Shouldn\'t update a new class with wrong schedule hours (7am-11am and 2pm-8pm)', function(done){
            chai.request(app)
            put('/class/1')
            .send(fixtures.post.classWrongHour)
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            });
        });
        it('Shouldn\'t update a new class ussing wrong Id', function(done){
            chai.request(app)
            put('/class/666')
            .send(fixtures.post.newclass)
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            });
        });

    });
    describe('[DELETE] /class/:id', function(){
        it('Should delete a class by its Id', function(done){
            chai.request(app)
            .delete('/class/1')
            .end(function(err, res){
                should.not.exist(err);
                done();
            });
        });
        it('Shouldn\'t delete a class using wrong Id', function(done){
            chai.request(app)
            .delete('/class/666')
            .end(function(err, res){
                should.exist(err);
                done();
            });
        });
    });
});