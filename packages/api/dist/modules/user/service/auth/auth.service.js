"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerWithEmail = exports.resendConfirmationMail = exports.sendConfirmationMail = void 0;
const mail = __importStar(require("../../../../config/mail"));
const authRepository = __importStar(require("../../repository/auth"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const pino_1 = require("../../../../config/pino");
const sendConfirmationMail = async (user) => {
    if (user?.local?.email && user.confirmationToken) {
        try {
            await mail.sendConfirmationMail(user.local.email, user.confirmationToken);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    return false;
};
exports.sendConfirmationMail = sendConfirmationMail;
const resendConfirmationMail = async (email, password) => {
    try {
        const foundUser = await authRepository.findUser(email);
        if (foundUser && !foundUser.active && foundUser.password) {
            const isPasswordCorrect = bcrypt_1.default.compareSync(password, foundUser.password);
            if (isPasswordCorrect) {
                const user = await authRepository.regenerateUserConfirmationToken(email);
                if (user) {
                    return await (0, exports.sendConfirmationMail)(user);
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    catch (e) {
        return false;
    }
};
exports.resendConfirmationMail = resendConfirmationMail;
const registerWithEmail = async (email, password) => {
    const foundUser = await authRepository.findUser(email);
    if (foundUser) {
        pino_1.logger.error(`User already registered with email ${email}`);
        return false;
    }
    else {
        try {
            const newUser = await authRepository.createUser(email, password);
            if (newUser && newUser.id) {
                const isConfirmationEmailSent = await (0, exports.sendConfirmationMail)(newUser);
                if (isConfirmationEmailSent) {
                    return true;
                }
                else {
                    authRepository.deleteUser(newUser.id);
                    return false;
                }
            }
            else {
                pino_1.logger.error(`An error occured while creating new user: ${email}`);
                return false;
            }
        }
        catch (e) {
            return false;
        }
    }
};
exports.registerWithEmail = registerWithEmail;
