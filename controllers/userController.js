const mongoose = require('mongoose');
const User = mongoose.model('User');
const sha256 = require('js-sha256');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { name, phone, password } = req.body;

    const userExists = await User.findOne({
        phone,
    });

    if(userExists) throw "User with same phone number already exists!";

    const user = new User({ 
        name, 
        phone, 
        password: sha256(password + process.env.SALT) 
    });

    await user.save();

    res.json({
        message: "User " + name + " Registered Successfully!"
    });
};

exports.login = async (req, res) => {
    const { phone, password } = req.body;
    const user = await User.findOne({
        phone,
        password: sha256(password + process.env.SALT)
    });

    if(!user) throw "Phone and Password did not match"

    const token = await jwt.sign({id: user.id}, process.env.SECRET);
    res.json({
        message: "User logged successfully",
        token
    });
};