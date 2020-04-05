var expect  = require("chai").expect;
var request = require("request");


var Cookies;


describe("Admin Portal", function() {
        
    describe("Login page", function() {
    
        var url = "http://localhost:80/";
    
        it("returns status 200", function(done) {
            request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
            });
        });
    });

    describe('Login unsuccessfully', function() {
        it('Login unsuccessfully with incorrect credential', function(done) {
            var user = {username:"random", password:"random"};
            var options = {
                url: "http://localhost:80/login",
                method: "post",
                'headers': {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }
            request(options, function (error, response) { 
                expect(response.statusCode).to.equal(404);
                done();
            });
        }); 
    });

    describe('Login successfully', function() {
        it('Login successfully with correct credential', function(done) {
            var user = {username:"admin", password:"admin"};
            var options = {
                url: "http://localhost:80/login",
                method: "post",
                'headers': {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }
            request(options, function (error, response) { 
                expect(response.statusCode).to.equal(200);
                
                Cookies = response.headers['set-cookie'].pop().split(';')[0];
                console.log(Cookies);
                done();
            });
        }); 
    });

    // describe("Access other page after login", function() {
    
    //     // var url = "http://localhost:80/view_agents";
    //     // var options = {
    //     //     url: "http://localhost:80/login",
    //     //     method: "post",
    //     //     'headers': {
    //     //         'Content-Type': 'application/json'
    //     //     },
    //     //     body: JSON.stringify(user)
    //     // }
    //     var options = {
    //         url : "http://localhost:80/view_agents",
    //         method: 'get',
    //         cookies: Cookies
    //     }
    //     it("redirect to login page", function(done) {
    //         request(options, function(error, response, body) {
    //         expect(response.statusCode).to.equal(200);
    //         // check redirection
    //         console.log(response.body);
    //         done();
    //         });
    //     });
    // });

    describe("Logout page", function() {
    
        var url = "http://localhost:80/logout";
    
        it("redirect to home page", function(done) {
            request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            // check redirect to home page
            expect(response.request.uri.href).to.equal('http://localhost:80/');
            done();
            });
        });
    });


    describe("Access other page without login", function() {
    
        var url = "http://localhost:80/view_agents";
    
        it("redirect to login page", function(done) {
            request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            // check redirection
            expect(response.request.uri.href).to.equal('http://localhost:80/login');
            done();
            });
        });
    });
});