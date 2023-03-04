"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpMethod = void 0;
const mongoose_1 = require("mongoose");
var SignUpMethod;
(function (SignUpMethod) {
    SignUpMethod["LOCAL"] = "local";
    SignUpMethod["GOOGLE"] = "google";
    SignUpMethod["FACEBOOK"] = "facebook";
})(SignUpMethod = exports.SignUpMethod || (exports.SignUpMethod = {}));
const UserSchema = new mongoose_1.Schema({
    method: {
        type: SignUpMethod,
        required: true,
    },
    local: {
        email: {
            type: String,
            lowercase: true,
        },
        password: {
            type: String,
        },
    },
    google: {
        id: {
            type: String,
        },
        email: {
            type: String,
            lowercase: true,
        },
    },
    facebook: {
        id: {
            type: String,
        },
        email: {
            type: String,
            lowercase: true,
        },
    },
    active: {
        type: Boolean,
        default: false,
    },
    confirmationToken: {
        type: String,
    },
    confirmationTokenExpiry: {
        type: Date,
        default: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // until tomorrow
    },
    password: {
        type: String,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('User', UserSchema);
