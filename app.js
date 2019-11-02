var express = require("express");
var app = express();
const jwt = require('jsonwebtoken');
var user = require('./src/api/user');
var auth = require('./src/auth.js')
var meeting_room = require('./src/api/meeting-room');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
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
app.get('/api/users', user.list);
app.post('/api/users', user.create);
app.get('/api/meeting-room',auth.isAdmin, meeting_room.list);
app.get

app.get("/", function(req, res) {

});

app.listen(3000);
