var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var voterSchema = new Schema({
    title: String,
    description: String,
    votes: {
        type: Number,
        default: 0
    },
    comments: [String]//some many comment on one item
})

var Vote = mongoose.model("Vote", voterSchema);

module.exports = Vote;