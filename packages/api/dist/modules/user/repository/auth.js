"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.regenerateUserConfirmationToken = exports.createUser = exports.findUserWithConfirmationToken = exports.findUser = void 0;
const user_entity_1 = __importDefault(require("../entity/user.entity"));
const mongodb_1 = __importDefault(require("mongodb"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uniqid_1 = __importDefault(require("uniqid"));
const pino_1 = require("../../../config/pino");
const findUser = async (email) => {
    try {
        return await user_entity_1.default.findOne({ 'local.email': email });
    }
    catch (e) {
        pino_1.logger.error('An error occured  while finding user with email', e);
        return null;
    }
};
exports.findUser = findUser;
const findUserWithConfirmationToken = async (confirmationToken) => {
    try {
        return await user_entity_1.default.findOne({ confirmationToken });
    }
    catch (e) {
        pino_1.logger.error('An error occured  while finding user with confirmationToken', e);
        return null;
    }
};
exports.findUserWithConfirmationToken = findUserWithConfirmationToken;
const createUser = async (email, password) => {
    const newUser = new user_entity_1.default({
        method: 'local',
        local: {
            email: email,
            password: password,
        },
    });
    try {
        const hashedPwd = await hashPassword(newUser);
        if (hashedPwd && newUser && newUser.local && newUser.local.password) {
            newUser.local.password = hashedPwd;
            newUser.confirmationToken = (0, uniqid_1.default)();
            return await newUser.save();
        }
        else {
            pino_1.logger.error(`An error occured while hashing the password`);
            return null;
        }
    }
    catch (e) {
        pino_1.logger.error(`An error occured while createUser`, e);
        return null;
    }
};
exports.createUser = createUser;
const regenerateUserConfirmationToken = async (email) => {
    try {
        const theUser = await user_entity_1.default.findOne({ 'local.email': email });
        if (theUser) {
            theUser.confirmationToken = (0, uniqid_1.default)();
            return await theUser.save();
        }
        else {
            pino_1.logger.error(`No user with email ${email} is found`);
            return null;
        }
    }
    catch (e) {
        pino_1.logger.error(`An error occured while regenerateUserConfirmationToken`, e);
        return null;
    }
};
exports.regenerateUserConfirmationToken = regenerateUserConfirmationToken;
const deleteUser = async (id) => {
    try {
        await user_entity_1.default.deleteOne({ _id: new mongodb_1.default.ObjectID(id) });
        return true;
    }
    catch (e) {
        pino_1.logger.error(`An error occured while deleting user with id ${id}`);
        if (e instanceof Error) {
            if (e instanceof Error) {
                pino_1.logger.error(e);
            }
        }
        return false;
    }
};
exports.deleteUser = deleteUser;
async function hashPassword(user) {
    const password = user?.local?.password;
    const saltRounds = 10;
    try {
        return await bcrypt_1.default.hash(password, saltRounds);
    }
    catch (e) {
        pino_1.logger.error(`An error occured while hashPassword`, e);
        return null;
    }
}
