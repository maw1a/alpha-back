const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is required!"
    },
    phone: {
        type: String,
        required: "Phone Number is required!"
    },
    password: {
        type: String,
        required: "Password is required!"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);