const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    vehicleId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    driverId: {
        type: String,
        requird: true
    },
    PickupPincode: {
        type: String,
        required: true
    },
    PickupCity: {
        type: String,
        required: true
    },
    pickupAddress: {
        type: String,
        required: true
    },
    DropPincode: {
        type: String,
        required: true
    },
    DropCity: {
        type: String,
        required: true
    },
    DropOffAddress: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    Requirement: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: [
            "Selected",
            "applied",
            "Booked",
            "Cancel"
        ],
        default: "Selected"
    },
    date: {
        type: String,
        requird: true
    },
    state: {
        type: String,
        default: "Punjab"
    },
})

module.exports = mongoose.model("Booking", bookingSchema);
