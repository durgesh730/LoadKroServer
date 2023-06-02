const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
   driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
   },
   name: {
      type: String,
      required: true,
   },
   lname: {
      type: String,
      required: true,
   },
   gender: {
      type: String,
      required: true,
   },
   DOB: {
      type: String,
      required: true,
   },
   phone: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
   },
   PanCardNumber: {
      type: String,
      required: true,
   },
   address: {
      type: String,
      required: true,
   },
   city: {
      type: String,
      required: true,
   },
   state: {
      type: String,
      required: true,
   },
   pincode: {
      type: String,
      required: true,
   },
   country: {
      type: String,
      required: true,
   },
   basefare: {
      type: String,
      required: true,
   },
   bodysize: {
      type: String,
      required: true,
   },
   lodingCapacity: {
      type: String,
      required: true,
   },
   transName: {
      type: String,
      required: true,
   },
   Vnamber: {
      type: String,
      required: true,
   },
   DLnumber: {
      type: String,
      required: true,
   },
   RCnumber: {
      type: String,
      required: true,
   },
   PolutionCertificate: {
      type: String,
   },
   driverImage: {
      type: String,
      required: true,
   },
   VehicleImage: {
      type: String,
      required: true,
   },
   DLImage: {
      type: String,
      required: true,
   },
   RCImage: {
      type: String,
      required: true,
   },
   isVerified: {
      type: Boolean,
      default: false
   },
   date: {
      type: Date,
      default: Date.now,
      requird: true
   },
   Scity: {
      type: Array,
      requird: true
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
})

module.exports = mongoose.model("driver", driverSchema);