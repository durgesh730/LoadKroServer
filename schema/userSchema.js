const mongoose = require('mongoose');
require('mongoose-type-email');

let schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return v !== "" ? /\+\d{1,3}\d{10}/.test(v) : true;
            },
            msg: "Phone number is invalid!",
        },
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        unique: true,
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["Driver", "user"],
        required: true,
    },
    link: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now,
        requird: true
    },
})

module.exports = mongoose.model("User", schema);