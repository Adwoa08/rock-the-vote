var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: String,
    gender: String,
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
    },
    admin: {
        type: Boolean,
        default: false
    },
    uploads: {
        type: Number,
        default: 0
    },
    resetPasswordToken: String,

    resetPasswordExpires: Date
});

userSchema.pre("save", function (next) {
    var user = this;
    if (!user.isModified("password")) return next();

    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
    });
});


userSchema.methods.checkPassword = function (passwordAttempt, callback) {
    bcrypt.compare(passwordAttempt, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};



userSchema.methods.withoutPassword = function () {
    var user = this.toObject();
    delete user.password;
    return user;
};





var User = mongoose.model("User", userSchema);

module.exports = User;
