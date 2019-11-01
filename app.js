var express = require("express");
var app = express();

app.get("/api/create-meeting-rooms", function(req, res) {
    res.send("OK")
});

app.get("/", function(req, res) {

});

app.listen(3000);
