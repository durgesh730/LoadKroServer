const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true

    },
    desc: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        requird: true
    },
})

module.exports = mongoose.model("Comments", commentSchema);