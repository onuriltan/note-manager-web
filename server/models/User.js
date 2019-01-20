const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
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
