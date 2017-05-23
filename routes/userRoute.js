var express = require("express");
var userRouter = express.Router();
var User = require("../model/user-schema");
var multer = require("multer");

//image upload
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/images/')//I added images to the storage
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

var upload = multer({storage: storage}).single("file");

userRouter.put("/", upload, function(req, res){
    User.findByIdAndUpdate(
        req.user._id, 
        {$set: {image: req.file.filename}}, 
        {new: true}, 
        function(err, img){
            if(err) return res.status(500).send(err);
            res.send(img);
        });
});
//Image upload ends here



//User info routes
userRouter.route("/profile")
    .get(function(req, res){
    User.findOne({_id: req.user._id}, function(err, userInfo){
        if(err) return res.status(500).send(err);
        res.send(userInfo);
    });
})

userRouter.route("/profile/me")
    .put(function(req, res){
    User.findOneAndUpdate({_id: req.user._id}, req.body, {new: true}, function(err, userInfo){
        if(err) res.status(500).send(err);
        res.send(userInfo);
    })
})
    .delete(function(req, res){
    User.findOneAndRemove({_id: req.user._id}, function(err, removedUserInfo){
        if(err) res.status(500).send(err);
        res.send(removedUserInfo);
    })
})


module.exports = userRouter;