var expect  = require("chai").expect;
var request = require("request");

describe("View and edit agent", function() {
        
    // to do: keep user session

    describe("View all agents page", function() {
    
        var url = "http://localhost:80/view_agents";
    
        it("returns status 200", function(done) {
            request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
            });
        });
    });

    describe("Valid edit agent page", function() {
    
        var url = "http://localhost:80/edit_agent/5e532bccb4528b74a00c92f9";
    
        it("returns status 200", function(done) {
            request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
            });
        });
    });

    describe("invalid edit agent page", function() {
    
        var url = "http://localhost:80/edit_agent/123";
    
        it("returns status 404", function(done) {
            request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(404);
            done();
            });
        });
    });

    describe("Add agent with valid information", function() {
        var agent_info = {
            id: "5e7ac07a35c8367f99b8e19f",
            firstname: "Jhonson",
            lastname:"Hanks",
            email: "abc@asdhaha.email",
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

    
        it("returns status 200", function(done) {
            request(options, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            console.log(response.body);
            done();
            });
        });
    });


});