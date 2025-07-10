const express = require('express');
const router = express.Router();
const User = require('../schemas/users');

router.post('/register', async (req, res, next) => {
    try {
        const {nickname, email, password} = req.body;
        const user = new User({email, password, nickname});
        const result = await user.save();
        return res.json(result);
    } catch (e) {
        return res.status(500).json(e);
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (e) {
        return res.status(500).json(e);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const deleted = await User.findByIdAndDelete(id);
        return res.json(deleted);
    } catch (e) {
        return res.status(500).json(e);
    }
})

router.put('/:id', async (req,res,next) => {
    try {
        const {id} = req.params;
        const updated = await User.findByIdAndUpdate(id);
        return res.json(updated);
    } catch (e) {
        return res.status(500).json(e);
    }
})

module.exports = router;