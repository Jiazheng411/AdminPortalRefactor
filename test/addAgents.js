var expect  = require("chai").expect;
var request = require('supertest'),
    should = require('chai').should();

describe("Add agent", function() {
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

    describe('get add agent page', function(){
        it('should return 200', function (done) {
          agent
            .get('/add_agent')
            .end(function (err, res) {
              if (err) return done(err);
              res.status.should.be.equal(200);
              done();
            });
        });
      });


    describe('add agent with valid information', function(){
        var agent_info = {
            password: "Sutd@1234",
            firstname: "Apple",
            lastname:"Wong",
            email: "abc@asd.email",
            english: 1,
            chinese:1,
            malay:1,
            skill1:1,
            skill2:1,
            skill3:1
        }
        it('add agent successfully and return 200', function (done) {
          agent
            .post('/add_agent')
            .send(agent_info)
            .end(function (err, res) {
              if (err) return done(err);
              res.status.should.be.equal(200);
              done();
            });
        });
      });


      describe('add agent with invalid information', function(){
        var agent_info = {
            password: "1234",
            firstname: "Apple",
            lastname:"Wong",
            email: "1234",
            english: 1,
            chinese:1,
            malay:1,
            skill1:1,
            skill2:1,
            skill3:1
        }
        it('add agent not successfully and return 404', function (done) {
          agent
            .post('/add_agent')
            .send(agent_info)
            .end(function (err, res) {
              if (err) return done(err);
              res.status.should.be.equal(404);
              done();
            });
        });
      });

});