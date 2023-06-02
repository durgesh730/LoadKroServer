const express = require("express")
const router = express.Router();
const Comments = require("../schema/CommentSchema");
const fetchuser = require('../middleware/fetchuser')

router.post("/SavedComments", fetchuser, async (req, res) => {
    const { comment } = req.body
    const user = req.user;
    try {
        if (comment.comment && user) {
            const savedComments = await Comments({ desc: comment.comment, userId: user.id })
            const saved = await savedComments.save();
            res.status(201).json({ saved })
        } else {
            res.status(404).send({ msg: "Some Internal Error Occured" })
        }
    } catch (error) {
        res.status(404).send({ msg: "Some Internal Error Occured" })
    }
})

router.get('/allcomments', async (req, res) => {
    try {
        const data = await Comments.find();
        res.status(201).json({ status: 201, data })
    } catch (error) {
        res.status(404).send({ msg: "Some Internal Error Occured" })
    }
})


module.exports = router;