const fixtures = require('./room.fixtures');
const roomModel = require('./room.model')

describe('room', function(){
    before(function(){        
            roomModel.removeAll().then()
    })

    after(function(){
            roomModel.removeAll().then()
    })
    describe('[POST] /room', function(){
        it('Should create a new room', function(done){
            chai.request(app)
            .post('/room')
            .send(fixtures.post.room)
            .end(function(err, res){
                should.not.exist(err);
                res.body.should.be.an('object');
                done();
            })
        });
        it('Should create another room', function(done){
            chai.request(app)
            .post('/room')
            .send(fixtures.post.anotherRoom)
            .end(function(err, res){
                should.not.exist(err);
                res.body.should.be.an('object');
                done();
            });
        });
        it('Should\'t create more than two rooms', function(done){
            chai.request(app)
            .post('/room')
            .send(fixtures.post.anotherRoom)
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            })
        });
        it('Should\'t create a room with wrong format fields', function(done){
            chai.request(app)
            .post('/room')
            .send(fixtures.post.wrong_room)
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            })
        });

        it('Should\'t create a room w/ duplicated name', function(done){
            chai.request(app)
            .post('/room')
            .send(fixtures.post.room)
            .end(function(err,res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            })
        });
        it('Should\'t create a room w/o required fields', function(done){
            chai.request(app)
            .post('/room')
            .send(fixtures.post.wrngflds_room)
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            })
        });        
    });   
    describe('[GET] /room', function(){
        it('Should get all the rooms', function(done){
            chai.request(app)
            .get('/room')
            .end(function(err, res){
                should.not.exist(err);
                res.body.should.to.be.an('array');
                done();
            });
        });
        it('Should get the rooms that match the query', function(done){
            chai.request(app).get('/room?name=A101').end(function(err, res){
                should.not.exist(err);
                done();
            });
        });        
    }); 
    describe('[GET] /room/:id', function(){
        it('Should get a room by its Id', function(done){
            chai.request(app)
            .get('/room/1')
            .end(function(err, res){
                should.not.exist(err);
                expect(res.body).should.to.be.an('object');
                done();
            });
        });
        it('Shouldn\'t get a room w/ wrong Id', function(done){
            chai.request(app).get('/room/666').end(function(err, res){
                should.exist(err);
                done();
            });
        });        
    });
    describe('[PUT] /room/:id', function(){
        it('Should update a room using its Id and correct properties', function(done){
            chai.request(app).put('/room/1').send(fixtures.put.roomUpdate).end(function(err, res){
                should.not.exist(err);
                done();
            });
        });
        it('Should\'t update a room with wrong format fields', function(done){
            chai.request(app)
            .put('/room/1')
            .send(fixtures.post.wrong_room)
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            })
        });

        it('Should\'t update room w/ duplicated name', function(done){
            chai.request(app)
            .put('/room/2')
            .send(fixtures.post.room)
            .end(function(err,res){
                should.exist(err);
                expect(res).to.have.status(422);
                done();
            })
        });        
    });   
    describe('[DELETE] /room/:id', function(){
        it('Should delete a room by its Id', function(done){
            chai.request(app)
            .delete('/room/1')
            .end(function(err, res){
                should.not.exist(err);
                done();
            })
        });
        it('Shouldn\'t delete a room using wrong Id', function(done){
            chai.request(app)
            .delete('/room/666')
            .end(function(err, res){
                should.exist(err);
                expect(res).to.have.status(404);
                done();
            })
        });
    });

});