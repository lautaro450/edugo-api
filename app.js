var express = require("express");
var app = express();
const jwt = require('jsonwebtoken');
var user = require('./src/api/user');
var auth = require('./src/auth')
var meeting_room = require('./src/api/meeting-room');
var appointment = require('./src/api/appointment');
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// jwt token examples to send in header (Authorization: <jwt-token>)
app.get("/auth/user", function(req, res) {
    let token = jwt.sign({
         "user": {
             "id": 1,
             "nickname": "John Smith",
             "roles": []
         } 
        },
         'secret', { algorithm: 'HS256'});
    res.send(token);
});
app.get("/auth/admin", function(req, res) {
    let token = jwt.sign({
        "user": {
            "id": 1,
            "nickname": "John Smith",
            "roles": ['admin']
        } 
       },
        'secret', { algorithm: 'HS256'});
        res.send(token);
});

// user
app.get('/api/users', user.list); // additional: list of users
app.post('/api/users', user.create); // additional: add new users

//meeting room
app.get('/api/meeting-room',auth.isUser, meeting_room.list);
app.post('/api/meeting-room',auth.isAdmin, meeting_room.create);
app.put('/api/meeting-room/:id',auth.isAdmin, meeting_room.update);
app.delete('/api/meeting-room/:id', auth.isAdmin, meeting_room.delete);

//appointments
app.post('/api/appointment', auth.isUser, appointment.create);
app.delete('/api/appointment/:id', auth.isUser, appointment.delete);
app.listen(3000);
module.exports = app;