const express = require('express');
const router = express.Router();
const Driver = require("../schema/driverSchema");
const User = require("../schema/userSchema")
const Booking = require('../schema/BookingSchema');
const City = require('../schema/CitiesSchema');


// // API for search data 
router.get("/ByCityName", async (req, res) => {
    const keyword = req.query.city
        ? { "city": { $regex: req.query.city, $options: "i" } } //case insensitive
        : {};
    const users = await City.find(keyword);
    res.send(users);
});

// // API for search data 
router.get("/BytransName", async (req, res) => {
    console.log(req.query.transName)
    const keyword = req.query.transName
        ? { "transName": { $regex: req.query.transName, $options: "i" } } //case insensitive
        : {};
    const users = await Driver.find(keyword);
    res.send(users);
});


router.put("/changeIsVerified/:id", (req, res) => {
    Driver.findOneAndUpdate({ _id: req.params.id }, { $set: { isVerified: req.body.isVerified } })
        .then((response) => {
            res.json(response)
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})

router.get("/UserDataAtAdmin/:id", (req, res) => {
    User.find({ _id: req.params.id })
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
})

router.delete("/driversAndTrucks/:id", async (req, res) => {
    try {
        const deleted = await Driver.findByIdAndDelete({ _id: req.params.id })
        res.status(201).json(deleted);
    } catch (error) {
        console.error(error.message);
        res.status(401).send("Some error occured")
    }
})

router.delete("/deleteBookedVehicles/:id", async (req, res) => {
    try {
        const deleted = await Booking.findByIdAndDelete({ _id: req.params.id })
        res.status(201).json(deleted);
    } catch (error) {
        console.error(error.message);
        res.status(401).send("Some error occured")
    }
})

router.get('/bookedVehiclesAdmin', async (req, res) => {
    try {
        const book = await Booking.find();
        res.status(200).json(book);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

module.exports = router
