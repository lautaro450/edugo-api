var app = require('../app');
var chai = require('chai');
var expect = require("chai").expect;
var request = require('supertest');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

dummy_appointment_data = {
    'user_id': 1,
    'meeting_room_id': 1,
    'meeting_title': "sometitle",
    "meeting_description": "description",
    "date": "2019-11-04 10:30:00"
}
user_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuaWNrbmFtZSI6IkpvaG4gU21pdGgiLCJyb2xlcyI6W119LCJpYXQiOjE1NzI2ODM0NTh9.EJ3CbKsEm-9-OorlweLciM2D8NNBiYTm4eF6ILAabj0';
admin_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuaWNrbmFtZSI6IkpvaG4gU21pdGgiLCJyb2xlcyI6WyJhZG1pbiJdfSwiaWF0IjoxNTcyNjg0NzQ4fQ.oXeD1NxZkLHdPf1BHGMCFpKpgDuX0bWQTrgV9n6mzZ0'
describe("Appointments", function() {
    describe("create appointments", function() {
        it("you should be logged in order to create an appointment", function(done) {
            request(app)
            .post('/api/appointment')
            .end(function(err,res) {
                if(err) done(err);
                expect(res).to.have.status(500);
                done();
            });
        });
        it("check if time slot was already booked", function(done){
            request(app)
            .post('/api/appointment')
            .set("Authorization",user_token)
            .send(dummy_appointment_data)
            .expect(400)
            .end((err,res) => {
                done()
            })
        });
        it("check null values", function(done){
            request(app)
            .post('/api/appointment')
            .set("Authorization",user_token)
            .send({})
            .expect(400)
            .expect('some values are null')
            .end((err) => {
                if (err) return done(err);
                done();
            })
        });
    });

}); 