const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user');
const Phone = require('../models/phone');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            if (user.password == password) {
                res.json({ user });
            }
            else {
                res.json({ msg: 'Invalid Credentials' });
            }
        }
        else {
            res.json({ msg: 'No User Found' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server Error');
    }
});


router.post('/load', async (req, res) => {
    try {
        const _id = mongoose.Types.ObjectId(req.body.tok);
        let user = await User.findOne({ _id });
        res.json({ user });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server Error');
    }
});

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let ress = await User.findOne({ email });
        if (ress) {
            res.json({ err: 'User Exists' });
        }
        else {
            const user = new User({
                name,
                email,
                password
            });
            await user.save();
            res.json({ user });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server Error');
    }
});

router.post('/changepassword', async (req, res) => {
    try {

        const { newpass, oldpass } = req.body;
        const _id = mongoose.Types.ObjectId(req.body.token);
        let ress = await User.find({ _id });
        if (ress && ress[0].password === oldpass) {
            ress[0].password = newpass;
            await ress[0].save();
            res.json({ msg: "Done" });
        }
        else {
            res.json({ msg: "Wrongpassword" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server Error');
    }
})


module.exports = router;