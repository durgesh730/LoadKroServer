const mongoose = require("mongoose")

const CitiesSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
})

module.exports = mongoose.model("Cities", CitiesSchema);