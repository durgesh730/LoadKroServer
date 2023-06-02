const express = require("express");
const Cities = require("../schema/CitiesSchema");
const router = express.Router();

router.post("/cities", async (req, res) => {
    try {
        const city = new Cities({ city: req.body.city.city })
        const saved = await city.save();
        res.status(201).json(saved);
    } catch (error) {
        console.error(error.message);
        res.status(401).send("Some error occured")
    }
})

router.delete("/OnebyOnecities/:id", async (req, res) => {
    try {
        const deleted = await Cities.findByIdAndDelete({ _id: req.params.id })
        res.status(201).json(deleted);
    } catch (error) {
        console.error(error.message);
        res.status(401).send("Some error occured")
    }
})

router.get("/allcities", async (req, res) => {
    try {
        const findall = await Cities.find()
        res.status(201).json(findall);
    } catch (error) {
        console.error(error.message);
        res.status(401).send("Some error occured")
    }
})


module.exports = router;