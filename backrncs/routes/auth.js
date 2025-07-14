const express = require('express');
const router = express.Router();
const User = require('../schemas/users');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

router.post('/register', async (req, res, next) => {
    try {
        const {nickname, email, password} = req.body;
        const hashed = await bcrypt.hash(password, 12);
        const user = new User({email, password:hashed, nickname});
        const result = await user.save();
        return res.json(result);
    } catch (e) {
        return res.status(500).json(e);
    }

});

router.post("/login", async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({message: "user not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({message: "password not match"})
        }
        const token = jwt.sign({
                userId: user._id,
                nickname: user.nickname
            },
            "secret",
            {expiresIn: "1h"}
        )
        return res.json({token});
    } catch (e) {
        return res.status(500).json(e);
    }
})

module.exports = router;