const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    email: {
        type: String
    },
    facebook: {
        id: {
            type: String,
        },
        email: {
            type: String,
        }
    },
    active: {
        type: Boolean,
        default: false
    },
    confirmationToken: {
        type: String,
    },
    confirmationTokenExpiry: {
        type: Date,
        default: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) // until tomorrow
    },
    password: {
        type: String,
    },
    date: {
        type: Date,
        default: new Date()
    }
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
