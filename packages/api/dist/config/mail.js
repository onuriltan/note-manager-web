"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendConfirmationMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const pino_1 = require("../config/pino");
const transporter = nodemailer_1.default.createTransport({
    service: 'Yandex',
    auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
    },
});
const sendConfirmationMail = async (to, confirmationToken) => {
    const mailOptions = {
        from: '"📒 NOTE MANAGER 📒" <' + process.env.MAIL_ADDRESS + '>',
        to: to,
        subject: 'Welcome to Note Manager ✔',
        text: 'Please confirm your account with this token = ' + confirmationToken,
        html: '<a href=' +
            process.env.CONFIRM_EMAIL_URL +
            '/' +
            confirmationToken +
            '>Click to activate your account</a>' +
            '<p> Please note that this link will expire in 72 hours, if the link is expired, you need to register again</p>',
    };
    // send mail with defined transport object
    try {
        await transporter.sendMail(mailOptions);
        pino_1.logger.info(`Confirmation email has been sent for user: ${to}`);
    }
    catch (e) {
        pino_1.logger.error(`An error occurred while sending confirmation email for user ${to}`);
        if (e instanceof Error) {
            if (e instanceof Error) {
                pino_1.logger.error(e);
            }
            throw e;
        }
    }
};
exports.sendConfirmationMail = sendConfirmationMail;
