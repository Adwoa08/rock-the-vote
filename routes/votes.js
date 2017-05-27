var express = require("express");
var voteRouter = express.Router();
var bodyParser = require("body-parser");
var Vote = require("../model/vote-schema")

voteRouter.use(bodyParser.json());


voteRouter.get('/all', function (req, res) {
    Vote.find({}, function (err, votes) {
        res.send(votes);
    })
})


voteRouter.get('/', function (req, res) {
    Vote.find({_id: req.user._id},function (err, votes) {
        res.send(votes);
    })
})

voteRouter.post("/", function (req, res) {
    var newVote = new Vote(req.body);
    newVote.user = req.user;
    newVote.save(function (err, savedVote) {
        res.send(savedVote);
    })
})


voteRouter.delete("/:id", function (req, res) {
    Vote.findByIdAndRemove({user: req.user._id, _id: req.params.id}, function (err, voteToBeDeleted) {
        voteToBeDeleted.remove(function (err) {
            res.send("Your item has been deleted Successfully");
        })
    })

})


voteRouter.put("/:id", function (req, res) {
    Vote.findByIdAndUpdate({user: req.user._id, _id: req.params.id}, req.body, {new: true}, function (err, editedVote) {
        res.send(editedVote);
    })
})




module.exports = voteRouter;
