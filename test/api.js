var expect = require("chai").expect;
var request = require("request");

describe("checking API Endpoint", function() {
    describe("/ endpoint", function(){
        var url = "http://localhost:3000/api/create-meeting-rooms";
        it("returns status 200", function(done) {
            request(url, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });
}); 