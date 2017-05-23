var express = require("express");
var authRouter = express.Router();
var User = require("../model/user-schema");
var jwt = require("jsonwebtoken");
var config = require("../config");
var async = require("async");
var crypto = require("crypto");

authRouter.post("/login", function (req, res) {

    User.findOne({username: req.body.username}, function (err, user) {
        if (err) return res.status(500).send(err);
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "User with the provided username was not found"
            })
        } else if (user) {
            user.checkPassword(req.body.password, function (err, match) {
                if (err) throw (err);
                if (!match) res.status(401).send({
                    success: false,
                    message: "Incorrect password"
                });
                else {
                    var token = jwt.sign(user.toObject(), config.secret, {
                        expiresIn: "24h"
                    });
                    res.send({
                        user: user.withoutPassword(),
                        token: token,
                        success: true,
                        message: "Here's your token!"
                    });
                }
            })
        }
    });

});


authRouter.post("/signup", function (req, res) {
    User.find({
        username: req.body.username
    }, function (err, existingUser) {
        if (err) return res.status(500).send(err);
        if (existingUser.length) return res.send({
            success: false,
            message: "That username is already taken."
        });
        else {
            var newUser = new User(req.body);
            newUser.save(function (err, userObj) {
                if (err) return res.status(500).send(err);
                res.send({
                    user: userObj,
                    message: "Successfully created new user.",
                    success: true
                });
            });
        }
    })
});


authRouter.post("/change-password", function (req, res) {  
    User.findById(req.user._id, function (err, user) {
        if (err) {
            res.status(500).send(err);
        } else {
            user.password = req.body.newPassword || user.password;
            user.save(function (err, user) {
                res.send({success: true, user: user.withoutPassword()});
            });
        }
    });
});






authRouter.post("/forgot", function (req, res, next) {  
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                if (err) return done(err);
                var token = buf.toString("hex");
                done(null, token);
            });
        },
        function (token, done) {
            User.findOne({email: req.body.email}, function (err, user) {
                if (err) return res.send(err);
                else if (!user) return res.status(404).send({
                    success: false,
                    message: "The email " + req.body.email + " isn't registered in the system"
                });
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000;  // 1 hour
                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            var helper = require("sendgrid").mail;
            var fromEmail = new helper.Email("noreply@todosapp.io");
            var toEmail = new helper.Email(user.email);
            var subject = "Your TodoApp password reset link is here";
            var content = new helper.Content("text/plain", 'You are receiving this because you (or someone else) ' +
                'have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/#/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n');
            var mail = new helper.Mail(fromEmail, subject, toEmail, content);
            var sendgrid = require("sendgrid")(config.sendgridApiKey);
            var request = sendgrid.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: mail.toJSON()
            });
            sendgrid.API(request, function (err, response) {
                if (err) return res.status(500).send({message: "failed on 164"});
                done(null, "done");
            });
        }
    ], function (err, result) {
        if (err) return res.status(500).send(err);
        res.status(202).send({success: true, message: "Mail sent successfully!"});
    })
});



authRouter.post("/reset/:resetToken", function (req, res) {  
    User.findOne({resetPasswordToken: req.params.resetToken}, function (err, user) {
        if (err) {
            res.status(500).send(err);
        } else {
            user.password = req.body.password || user.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function (err, user) {
                res.send({success: true, message: "Password successfully reset!"});
            });
        }
    });
});


module.exports = authRouter;
