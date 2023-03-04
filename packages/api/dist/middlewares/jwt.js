"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = exports.decodeToken = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_entity_1 = require("../modules/user/entity/user.entity");
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else {
        res.sendStatus(403);
    }
};
exports.verifyToken = verifyToken;
const decodeToken = (req, res, next) => {
    if (req.token) {
        jsonwebtoken_1.default.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                req.query.email = authData.email;
                next();
            }
        });
    }
    else {
        res.sendStatus(403);
    }
};
exports.decodeToken = decodeToken;
const signToken = (user) => {
    if (user.method) {
        let email = '';
        switch (user.method) {
            case user_entity_1.SignUpMethod.FACEBOOK:
                email = user.facebook?.email;
                break;
            case user_entity_1.SignUpMethod.GOOGLE:
                email = user.google?.email;
                break;
            case user_entity_1.SignUpMethod.LOCAL:
                email = user.local?.email;
                break;
            default:
        }
        return jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET, { expiresIn: '10m' });
    }
    else {
        return '';
    }
};
exports.signToken = signToken;
