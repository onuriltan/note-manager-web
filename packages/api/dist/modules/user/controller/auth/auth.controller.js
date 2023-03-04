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
exports.findUserWithConfirmationToken = exports.resendConfirmationEmail = exports.registerWithEmail = exports.loginWithEmail = exports.loginWithSocial = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const authRepository = __importStar(require("../../repository/auth"));
const authService = __importStar(require("../../service/auth/auth.service"));
const jwt = __importStar(require("../../../../middlewares/jwt"));
const pino_1 = require("../../../../config/pino");
const loginWithSocial = async (req, res) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (req?.user?.method) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const token = await jwt.signToken(req.user);
        if (token) {
            return res.redirect(`${process.env.CLIENT_URL}/login/?${
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            req.user.method}Token=${encodeURIComponent(token)}`);
        }
        else {
            return res.redirect(`${process.env.CLIENT_URL}/not-found`);
        }
    }
    else {
        return res.redirect(`${process.env.CLIENT_URL}/not-found`);
    }
};
exports.loginWithSocial = loginWithSocial;
const loginWithEmail = async (req, res) => {
    const { email, password } = req.body;
    const errors = [];
    const user = await authRepository.findUser(email);
    if (user?.local?.password) {
        const isPasswordCorrect = bcrypt_1.default.compareSync(password, user.local.password);
        if (!user.active) {
            errors.push({ msg: 'You need to activate your account' });
            return res.status(401).json({ errors });
        }
        else if (user.active && isPasswordCorrect) {
            const token = jwt.signToken(user);
            return res.json({ token, method: user.method });
        }
        else {
            errors.push({ msg: 'Username or password is wrong' });
            return res.status(401).json({ errors });
        }
    }
    else {
        errors.push({ msg: 'Username or password is wrong' });
        return res.status(401).json({ errors });
    }
};
exports.loginWithEmail = loginWithEmail;
const registerWithEmail = async (req, res) => {
    const { email, password } = req.body;
    const errors = [];
    const messages = [];
    const isSent = await authService.registerWithEmail(email, password);
    if (isSent) {
        messages.push({ msg: 'Check your email to confirm your account!' });
        return res.status(200).json({ messages });
    }
    else {
        errors.push({
            msg: 'An error occurred while sending confirmation email',
        });
        return res.status(400).json({ errors });
    }
};
exports.registerWithEmail = registerWithEmail;
const resendConfirmationEmail = async (req, res) => {
    const { email, password } = req.body;
    const errors = [];
    const messages = [];
    const isSent = await authService.resendConfirmationMail(email, password);
    if (isSent) {
        messages.push({ msg: 'Confirmation email is resent!' });
        return res.status(200).json({ messages });
    }
    else {
        errors.push({ msg: 'An error occurred' });
        return res.status(400).json({ errors });
    }
};
exports.resendConfirmationEmail = resendConfirmationEmail;
const findUserWithConfirmationToken = async (req, res) => {
    const errors = [];
    const confirmationToken = req.params.confirmationToken;
    const user = await authRepository.findUserWithConfirmationToken(confirmationToken);
    if (user) {
        const expiry = user.confirmationTokenExpiry?.getDate();
        const compare = new Date().setDate(new Date().getDate() + 3);
        if (expiry && expiry < compare) {
            user.confirmationToken = undefined;
            user.confirmationTokenExpiry = undefined;
            user.active = true;
            try {
                const updatedUser = await user.save();
                pino_1.logger.info(`User is activated by confirmation token: ${updatedUser?.local?.email}`);
            }
            catch (e) {
                if (e instanceof Error) {
                    pino_1.logger.error(e);
                }
            }
            const token = await jwt.signToken(user);
            res.json({ token });
        }
        else {
            await authRepository.deleteUser(user._id.toString());
            errors.push({ msg: 'Your account is expired, please re-register again' });
            return res.status(401).json({ errors });
        }
    }
    errors.push({ msg: 'No new user found with that token' });
    return res.status(404).json({ errors });
};
exports.findUserWithConfirmationToken = findUserWithConfirmationToken;
