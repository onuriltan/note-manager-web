"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.getUser = void 0;
const user_entity_1 = __importDefault(require("../entity/user.entity"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const pino_1 = require("../../../config/pino");
const getUser = async (email) => {
    return await user_entity_1.default.findOne({ 'local.email': email });
};
exports.getUser = getUser;
const changePassword = async (email, oldPassword, newPassword) => {
    const theUser = await user_entity_1.default.findOne({ 'local.email': email });
    if (theUser && theUser.local && theUser.local.password) {
        const isPasswordCorrect = bcrypt_1.default.compareSync(oldPassword, theUser.local.password);
        if (isPasswordCorrect) {
            let hashedPassword;
            try {
                hashedPassword = await hashPassword(newPassword);
                if (typeof hashedPassword === 'string') {
                    theUser.local.password = hashedPassword;
                }
                else {
                    pino_1.logger.error(`Cannot hash password for user ${theUser.local.email} `);
                    return false;
                }
            }
            catch (e) {
                pino_1.logger.error(`Cannot hash password for user ${theUser.local.email} `);
                return false;
            }
            theUser.save();
            return true;
        }
        else {
            pino_1.logger.warn(`User ${theUser.local.email} tries to change password but enters wrong current password`);
            return false;
        }
    }
    else {
        return false;
    }
};
exports.changePassword = changePassword;
async function hashPassword(password) {
    // better to make this method reusable through app
    const saltRounds = 10;
    return await new Promise((resolve, reject) => {
        bcrypt_1.default.hash(password, saltRounds, function (err, hash) {
            if (err)
                reject(err);
            resolve(hash);
        });
    });
}
