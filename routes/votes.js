var express = require("express");
var voteRouter = express.Router();
var bodyParser = require("body-parser");
voteRouter.use(bodyParser.json());
var Vote = require("../model/vote-schema")

voteRouter.get('/', function (req, res) {
    Vote.find(function (err, votes) {
        res.send(votes);
    })
})

voteRouter.post("/", function (req, res) {
    var newVote = new Vote(req.body);
    newVote.save(function (err, savedVote) {
        res.send(savedVote);
    })
})


voteRouter.delete("/:id", function (req, res) {
    Vote.findByIdAndRemove(req.params.id, function (err, voteToBeDeleted) {
        voteToBeDeleted.remove(function (err) {
            res.send("Your item has been deleted Successfully");
        })
    })

})




voteRouter.put("/:id", function (req, res) {
    Vote.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, function (err, editedVote) {
        res.send(editedVote);
    })
})


module.exports = voteRouter;
