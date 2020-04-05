var expect  = require("chai").expect;
var request = require("request");

describe("Add agent", function() {
        
    // to do: keep user session

    describe("Add agent page", function() {
    
        var url = "http://localhost:80/add_agent";
    
        it("returns status 200", function(done) {
            request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
            });
        });
    });

    describe("Add agent without session", function() {
        
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

        var session = {
            user: "admin",
            password: "admin"
        }

        var options = {
            'method': 'POST',
            'url': "http://localhost:80/add_agent",
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(agent_info),
            session: JSON.stringify(session)
        }

    
        it("returns status 302", function(done) {
            request(options, function(error, response, body) {
            expect(response.statusCode).to.equal(302);
            console.log(response.body);
            done();
            });
        });
    });

    describe("Add agent with valid information", function() {
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

        var session = {
            user: "admin",
            password: "admin"
        }

        var options = {
            'method': 'POST',
            'url': "http://localhost:80/add_agent",
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(agent_info),
            session: JSON.stringify(session)
        }

    
        it("returns status 200", function(done) {
            request(options, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            console.log(response.body);
            done();
            });
        });
    });

    describe("Add agent with invalid information", function() {
        
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


        var options = {
            'method': 'POST',
            'url': "http://localhost:80/add_agent",
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(agent_info),
        }

    
        it("returns status 404", function(done) {
            request(options, function(error, response, body) {
            expect(response.statusCode).to.equal(404);
            console.log(response.body);
            done();
            });
        });
    });

});