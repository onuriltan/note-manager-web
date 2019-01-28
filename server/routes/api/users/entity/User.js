const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    },
    confirmationToken: {
        type: String,
        required: true
    },
    confirmationTokenExpiry: {
        type: Date,
        default: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) // until tomorrow
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    }
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
