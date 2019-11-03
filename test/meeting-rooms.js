var app = require('../app');
var chai = require('chai');
var expect = require("chai").expect;
var request = require('supertest');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

dummy_user_data = {
    'name': 'fake_name',
    'description': 'fake_description',
    'capacity': 6
}
user_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuaWNrbmFtZSI6IkpvaG4gU21pdGgiLCJyb2xlcyI6W119LCJpYXQiOjE1NzI2ODM0NTh9.EJ3CbKsEm-9-OorlweLciM2D8NNBiYTm4eF6ILAabj0';
admin_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuaWNrbmFtZSI6IkpvaG4gU21pdGgiLCJyb2xlcyI6WyJhZG1pbiJdfSwiaWF0IjoxNTcyNjg0NzQ4fQ.oXeD1NxZkLHdPf1BHGMCFpKpgDuX0bWQTrgV9n6mzZ0'
describe("Meeting rooms", function() {
    var url = "http://localhost:3000/api/meeting-room";
    describe("see meeting rooms", function() {
        it("GET /api/meeting-room returns status 200", function(done) {
            request(app)
            .get('/api/meeting-room')
            .set("Authorization",user_token)
            .end(function(err,res) {
                expect(res).to.have.status(200);
                done();
            });
        });
        it("should respond with JSON array", function(done) {
            request(app)
            .get('/api/meeting-room')
            .set("Authorization",user_token)
            .end(function(err,res) {
                expect('Content-Type', /json/)
                done();
            });
        });
        
    });
    describe("create meeting rooms", function(){
        it("Check if meeting room name already exists", function(done) {
            request(app)
            .post('/api/meeting-room')
            .set("Authorization",admin_token)
            .send(dummy_user_data)
            .expect(400)
            .expect('meeting room name already exists')
            .end((err) => {
                if (err) return done(err);
                done();
            })
        });

        it("check null values", function(done){
            request(app)
            .post('/api/meeting-room')
            .set("Authorization",admin_token)
            .send({})
            .expect(400)
            .expect('name,description or capacity are null')
            .end((err) => {
                if (err) return done(err);
                done();
            })
        });
        it("Normal user should receive not authorized error", function(done){
            request(app)
            .post('/api/meeting-room')
            .set("Authorization",user_token)
            .send({})
            .expect(500)
            .end((err) => {
                if(err) return done(err)
                done()
            })
        });

    });
    describe("delete meeting rooms", function() {
        it("normal user should receive not authorized error", function(done){
            request(app)
            .delete('/api/meeting-room/10')
            .set("Authorization",user_token)
            .send({})
            .expect(500)
            .end((err) => {
                if(err) return done(err)
                done()
            })
        });
    });
    describe("update meeting rooms", function() {
        it("normal user can't update room information", function(done){
            request(app)
            .put('/api/meeting-room/4')
            .set("Authorization",user_token)
            .expect(500)
            .end((err) => {
                if(err) return done(err)
                done()
            })
        });
        it("id parameter should be integer and not null", function(done){
            request(app)
            .put('/api/meeting-room/sdfsasd')
            .set("Authorization",user_token)
            .expect(500)
            .end((err) => {
                if(err) return done(err)
                expect('id parameter should be an integer');
                done()
            })
        });
        it("pictures id can't be null",function(done){
            request(app)
            .put('/api/meeting-room/5')
            .set("Authorization",admin_token)
            .send({
                "name": "unit_testing", 
                "description": "unit_description",
                "pictures": [
                    {"meeting_room_id": 12, "url": "url/unit_url"},
                    {"meeting_room_id": 5, "url": "url/unit_url2"}
                ]
            })
            .expect(400)
            .expect('picture id is not an integer (or null)')
            .end((err) => {
                if(err) return done(err)
                done()
            })
        });

    })
}); 