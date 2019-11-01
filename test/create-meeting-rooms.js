var expect = require("chai").expect;
var request = require("request");

describe("Create meeting rooms", function() {
    var url = "http://localhost:3000/api/create-meeting-rooms";
    it("/api/create-meeting-rooms returns status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
    describe("Check payload JSON syntax", function(){
        it("Name exists and is a string");
        it("Description exists and is a string");
        it("Pictures exists and is a string");
        it("Capacity exists and is a integer")
    });
    it("Check meeting room name doesn't exist");
    describe("Admin users", function(){
        it("Meeting room can be created");

    });
    describe("Normal users", function(){
        it("Check permission error");

    });
}); 