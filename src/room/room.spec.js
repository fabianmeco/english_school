const fixtures = require('./room.fixtures');

describe('room', function(){
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
            .send(fixtues.post.anotherRoom)
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
                expect(res).to.have.status(409);
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
});