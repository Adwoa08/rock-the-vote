var express = require("express");
var app = express();
var path = require("path");
var config = require("./config");
var port = process.env.PORT | 3000;
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var voteRouter = require('./routes/votes');




//--------------------------------------------------
app.use(express.static(path.join(__dirname, "public")));
//-----------------------------------------------



//-------------------------------------------------
app.use(bodyParser.json());
app.use("/votes", voteRouter);
//-------------------------------------------------

//-------------------------------------------------
mongoose.connect(config.database, function (err) {
    console.log("connected to DB")
});
//-------------------------------------------------







app.listen(port, function () {
    console.log("Server is listening on port " + port);
})
