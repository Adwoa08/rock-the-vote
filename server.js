var express = require("express");
var app = express();
var path = require("path");
var config = require("./config");
var port = process.env.PORT | 3000;
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var voteRouter = require('./routes/votes');
var userRouter = require("./routes/userRoute");
var expressJwt = require("express-jwt");
var morgan = require("morgan");
var authRouter = require("./routes/authRoute")



//--------------------------------------------------
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads", "images")));
//-----------------------------------------------






//-------------------------------------------------
app.use("/auth", authRouter);
app.use("/auth/change-password", expressJwt({secret: config.secret}));
app.use("/api", expressJwt({secret: config.secret}));
app.use("/api/votes", voteRouter);
app.use("/api/user", userRouter);
//-------------------------------------------------




//-------------------------------------------------
mongoose.connect(config.database, function (err) {
    console.log("connected to DB")
});
//-------------------------------------------------







app.listen(port, function () {
    console.log("Server is listening on port " + port);
})
