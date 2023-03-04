"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnValidationErrors = exports.validateChangePassword = exports.validateLoginWithEmail = exports.validateRegisterWithEmail = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_validator_1 = require("express-validator");
exports.validateRegisterWithEmail = [
    (0, express_validator_1.check)('email').notEmpty().withMessage('Email required.'),
    (0, express_validator_1.check)('email').isEmail().withMessage('Email is not valid.'),
    (0, express_validator_1.check)('password').notEmpty().withMessage('Password required.'),
    (0, express_validator_1.check)('password2').notEmpty().withMessage('Repeat password required.'),
    (0, express_validator_1.check)('password', 'Passwords does not match.')
        .exists()
        .custom((password, { req }) => password === req.body.password2),
    (0, express_validator_1.check)('password2', 'Passwords does not match.')
        .exists()
        .custom((password2, { req }) => password2 === req.body.password),
    (0, express_validator_1.check)('password')
        .isLength({ min: 10, max: 20 })
        .withMessage('Password length should between 10 and 20'),
    (0, express_validator_1.check)('password2')
        .isLength({ min: 10, max: 20 })
        .withMessage('Password length should between 10 and 20'),
    (0, express_validator_1.check)('password')
        .matches(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)
        .withMessage('Password should have at least one special character.'),
    (0, express_validator_1.check)('password')
        .matches(/[a-z]/)
        .withMessage('Password should have at least one lowercase character.'),
    (0, express_validator_1.check)('password')
        .matches(/[A-Z]/)
        .withMessage('Password should have at least one uppercase character.'),
    (0, express_validator_1.check)('password')
        .matches(/[0-9]/)
        .withMessage('Password should have at least one number.'),
    (0, express_validator_1.check)('password2')
        .matches(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)
        .withMessage('Password should have at least one special character.'),
    (0, express_validator_1.check)('password2')
        .matches(/[a-z]/)
        .withMessage('Password should have at least one lowercase character.'),
    (0, express_validator_1.check)('password2')
        .matches(/[A-Z]/)
        .withMessage('Password should have at least one uppercase character.'),
    (0, express_validator_1.check)('password2')
        .matches(/[0-9]/)
        .withMessage('Password should have at least one number.'),
];
exports.validateLoginWithEmail = [
    (0, express_validator_1.check)('email').notEmpty().withMessage('Email required.'),
    (0, express_validator_1.check)('email').isEmail().withMessage('Email is not valid.'),
    (0, express_validator_1.check)('password').notEmpty().withMessage('Password required.'),
    (0, express_validator_1.check)('password')
        .isLength({ min: 10, max: 20 })
        .withMessage('Password length should between 10 and 20'),
];
exports.validateChangePassword = [
    (0, express_validator_1.check)('email').notEmpty().withMessage('Email required.'),
    (0, express_validator_1.check)('email').isEmail().withMessage('Email is not valid.'),
    (0, express_validator_1.check)('oldPassword').notEmpty().withMessage('Password required.'),
    (0, express_validator_1.check)('newPassword').notEmpty().withMessage('Repeat password required.'),
    (0, express_validator_1.check)('oldPassword', 'Passwords does not match.')
        .exists()
        .custom((password, { req }) => password !== req.body.password2),
    (0, express_validator_1.check)('newPassword', 'Passwords does not match.')
        .exists()
        .custom((password2, { req }) => password2 !== req.body.password),
    (0, express_validator_1.check)('oldPassword')
        .isLength({ min: 10, max: 20 })
        .withMessage('Password length should between 10 and 20'),
    (0, express_validator_1.check)('newPassword')
        .isLength({ min: 10, max: 20 })
        .withMessage('Password length should between 10 and 20'),
    (0, express_validator_1.check)('oldPassword')
        .matches(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)
        .withMessage('Password should have at least one special character.'),
    (0, express_validator_1.check)('oldPassword')
        .matches(/[a-z]/)
        .withMessage('Password should have at least one lowercase character.'),
    (0, express_validator_1.check)('oldPassword')
        .matches(/[A-Z]/)
        .withMessage('Password should have at least one uppercase character.'),
    (0, express_validator_1.check)('oldPassword')
        .matches(/[0-9]/)
        .withMessage('Password should have at least one number.'),
    (0, express_validator_1.check)('newPassword')
        .matches(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)
        .withMessage('Password should have at least one special character.'),
    (0, express_validator_1.check)('newPassword')
        .matches(/[a-z]/)
        .withMessage('Password should have at least one lowercase character.'),
    (0, express_validator_1.check)('newPassword')
        .matches(/[A-Z]/)
        .withMessage('Password should have at least one uppercase character.'),
    (0, express_validator_1.check)('newPassword')
        .matches(/[0-9]/)
        .withMessage('Password should have at least one number.'),
];
const returnValidationErrors = function (req, res, next) {
    const validationErrors = (0, express_validator_1.validationResult)(req);
    const errors = {}; // instead of sending errors as arrays, send object with keys, easier search
    validationErrors.array().forEach((error) => {
        errors[error.param] = error.msg;
    });
    if (!validationErrors.isEmpty()) {
        return res.status(422).json({ fieldErrors: errors });
    }
    next();
};
exports.returnValidationErrors = returnValidationErrors;
