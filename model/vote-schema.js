var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var voterSchema = new Schema({
    title: String,
    description: String,
     image: {
        type: String,
        default: 'http://pacifichealthsummit.org/images/publications/topic.png'
    },
    likes: {
        type: Number,
        default: 0
    },
       dislikes: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [String],//some many comment on one item
    numberOfComments: {
        type: Number,
        default: 0
    }
});

var Vote = mongoose.model("Vote", voterSchema);

module.exports = Vote;