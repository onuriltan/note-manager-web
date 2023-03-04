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
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.getUser = void 0;
const userRepository = __importStar(require("../../repository/user"));
const getUser = async (req, res) => {
    const { email } = req.query;
    if (email && typeof email === 'string') {
        const userProfile = await userRepository.getUser(email);
        if (userProfile !== null) {
            return res.send(userProfile);
        }
        else {
            return res.status(404).send();
        }
    }
    else {
        return res.status(404).send();
    }
};
exports.getUser = getUser;
const changePassword = async (req, res) => {
    const { email } = req.query;
    const { oldPassword, newPassword } = req.body;
    if (email && typeof email === 'string') {
        const isPasswordChanged = await userRepository.changePassword(email, oldPassword, newPassword);
        if (isPasswordChanged) {
            return res.status(200).send();
        }
        else {
            return res.status(400).json({
                fieldErrors: {
                    oldPassword: 'Password is wrong',
                    newPassword: '',
                },
            });
        }
    }
    else {
        return res.status(404).send();
    }
};
exports.changePassword = changePassword;
