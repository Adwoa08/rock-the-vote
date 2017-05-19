var express = require("express");
var app = express();

//-------------------------------------------------
var bodyParser = require("body-parser");
app.use(bodyParser.json());

//-------------------------------------------------
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/RockTheVote", function(err){
    console.log("connected to DB")
});

//-------------------------------------------------
var voteRouter = require('./routes/votes');
app.use("/votes", voteRouter);

//--------------------------------------------------
var path = require("path");
app.use(express.static(path.join(__dirname, "public")));
//-----------------------------------------------


var port = 3000;

app.listen(port, function(){
    console.log("Server is listening on " + port);
})