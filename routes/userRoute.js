const express = require('express');
const User = require('../schema/userSchema');
const router = express.Router();
const jwt = require("jsonwebtoken");

const keysecret = "durgeshchaudharydurgeshchaudhary"

const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator')
const Mailgen = require("mailgen");
const Booking = require('../schema/BookingSchema')


// email config
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "durgeshchaudhary020401@gmail.com",
        pass: "lqfxwpogsaocehjc"
    }
})

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: "https://mailgen.js/"
    }
})

//signup API path /user/signup

router.post('/signup', async (req, res) => {
    const { username, phone, email, password, type } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(password, salt);

        const savedEmail = await User.findOne({ email: email })
        if (savedEmail) {
            res.status(404).json({ error: "This Email is Already Exist" });
        } else {
            const data = new User({ username, email, password: pass, type, phone })
            const user = await data.save()
            const userdata = {
                user: {
                    id: user.id
                }
            }

            let token = jwt.sign(userdata, keysecret)
            if (token && user) {
                res.status(201).json({ status: 201, token, user })
            } else {
                res.status(401).send("Some error occured")
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(401).send("Some error occured")
    }
})

//login API  using post 

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const Ismatch = await bcrypt.compare(password, user.password);
            if (!Ismatch) {
                res.status(422).json({ error: "invalid details" })
            } else {
                const data = {
                    user: {
                        id: user.id
                    }
                }
                let token = jwt.sign(data, keysecret);
                res.status(201).json({ status: 201, user, token })
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(401).send("Some error occured")
    }
})

//using post generate otp at signup time API 

router.post('/generateOTPAtSignup', async (req, res) => {
    const { email } = req.body
    if (email) {
        req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
        console.log(req.app.locals.OTP)
        res.status(201).send({ code: req.app.locals.OTP })
    } else {
        return res.status(400).send({ error: "Email does not exist" })
    }
})


//Using post generate otp at Reset Password time API

router.post('/generateOTP', async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email: email });
    if (user) {
        req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
        console.log(req.app.locals.OTP)
        res.status(201).send({ code: req.app.locals.OTP, user })
    } else {
        return res.status(400).send({ error: "Email does not exist" })
    }
})

//After generating otp send mail API

router.post("/sendMail", async (req, res) => {
    const { email, text, subject } = req.body;
    // console.log(req.body)
    var Useremail = {
        body: {
            intro: text || "Welcome to Loadkro",
            outro: 'Need help, or have question? Just reply to this email'
        }
    }
    var emailBody = MailGenerator.generate(Useremail);
    let message = {
        from: " durgeshchaudhary020401@gmail.com",
        to: email,
        subject: subject || "Successfull done",
        html: emailBody
    }
    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ msg: "You should receive an email from Us. " })
        })
})

// // send Notification

// router.post("/sendMailnotification", async (req, res) => {
//     const { email, subject, text } = req.body;
//     var Useremail = {
//         body: {
//             intro: text || "Welcome to Loadkro",
//             outro: 'Need help, or have question? Just reply to this email'
//         }
//     }
//     var emailBody = MailGenerator.generate(Useremail);
//     let message = {
//         from: " durgeshchaudhary020401@gmail.com",
//         to: email,
//         subject: subject || "Signup Successfull",
//         html: emailBody
//     }
//     transporter.sendMail(message)
//         .then(() => {
//             return res.status(200).send({ msg: "You should receive an email from Us. " })
//         })
// })

//Reset password using put

router.put('/resetPasword', async (req, res) => {
    const { email, password } = req.body;
    try {
        const find = await User.findOne({ email: email });
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(password, salt);
        if (find) {
            const data = await User.findOneAndUpdate({ email: email }, { $set: { password: pass } }, { new: true })
            res.status(201).send({ data })
            console.log(data)
        } else {
            res.status(404).send({ msg: "Email is not found" })
        }
    } catch (error) {
        res.status(404).send({ msg: "Some error occured" })
    }
})

//fetch users data according to logged users API

router.get('/getUserData', fetchuser, async (req, res) => {
    const user = req.user;
    try {
        const data = await User.findOne({ _id: user.id });
        res.json({ data })
    } catch (error) {
        console.error(error.message);
        res.status(401).send("Some error occured")
    }
})

//edit users profiles API

router.put("/editUserProfiledata/:id", async (req, res) => {
    const { username, link, email, phone } = req.body;
    try {
        const newData = {};
        if (username) {
            newData.username = username.value
        }
        if (email) {
            newData.email = email.value
        }
        if (phone) {
            newData.phone = phone.value
        }
        if (link) {
            newData.link = link.link
        }
        const save = await User.findByIdAndUpdate({ _id: req.params.id },
            { $set: newData }, { new: true })
        res.status(201).json({ status: 201, save });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

router.post('/BookedAddress', fetchuser, async (req, res) => {
    const { Address, VehicleId, driverId } = req.body
    try {
        const data = new Booking({
            driverId: driverId,
            userId: req.user.id,
            pickupAddress: Address.pickupAddress,
            PickupPincode: Address.Ppincode,
            vehicleId: VehicleId,
            PickupCity: Address.Pcity,
            DropOffAddress: Address.DropOffAddress,
            DropPincode: Address.Dpincode,
            DropCity: Address.Dcity,
            name: Address.name,
            Requirement: Address.Req,
            phone: Address.phone,
            date: Address.date
        })
        const save = await data.save();
        res.status(200).json(save);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

router.put("/ChangeVehicleStatus/:id", (req, res) => {
    const { Booked } = req.body;
    Booking.findOneAndUpdate(
        { vehicleId: req.params.id },
        {
            $set:
            {
                status: Booked
            },
        }
    )
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.get('/bookedVehicles', fetchuser, async (req, res) => {
    try {
        const book = await Booking.find({ userId: req.user.id });
        res.status(200).json(book);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

module.exports = router;