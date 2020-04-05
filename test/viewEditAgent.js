var request = require('supertest'),
    should = require('chai').should();

describe("View and edit agents", function() {
    var agent = request.agent('http://localhost:80') ;
    // to do: keep user session

    before(function(done){
        agent
          .post('/login')
          .send({username: 'admin', password: 'admin'})
          .end(function(err, res) {
            if (err) return done(err);
            done();
          });
    })
  
    after(function(done){
        agent
          .get('/logout')
          .end(function(err, res) {
            if (err) return done(err);
  
            done();
          });
    })

    describe('get valid edit agent page', function(){
        it('should return 200', function (done) {
          agent
            .get('/edit_agent/5e7ac07a35c8367f99b8e19f')
            .end(function (err, res) {
              if (err) return done(err);
              res.status.should.be.equal(200);
              done();
            });
        });
      });


    describe('get invalid edit agent page', function(){
        it('should return 404', function (done) {
          agent
            .get('/edit_agent/123')
            .end(function (err, res) {
              if (err) return done(err);
              res.status.should.be.equal(404);
              done();
            });
        });
      });


    describe('update agent with valid information', function(){
        var agent_info = {
            id:'5e7ac07a35c8367f99b8e19f',
            firstname: "Apple",
            lastname:"Wong",
            email: "johnson@gmail.com",
            english: 1,
            chinese:1,
            malay:1,
            skill1:1,
            skill2:1,
            skill3:1
        }
        it('add agent successfully and return 200', function (done) {
          agent
            .post('/edit_agent/5e7ac07a35c8367f99b8e19f')
            .send(agent_info)
            .end(function (err, res) {
              if (err) return done(err);
              res.status.should.be.equal(200);
              done();
            });
        });
      });
});