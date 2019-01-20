const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    _id: {
        type: String
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
UserSchema.virtual('email').get(function () {
    return this._id;
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
