"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnValidationErrors = exports.validateDeleteNote = exports.validateEditNote = exports.validateCreateNote = exports.validateFindNotesBetweenDatesandKeyword = exports.validateFindNotes = void 0;
const express_validator_1 = require("express-validator");
exports.validateFindNotes = [
    (0, express_validator_1.query)('email').isEmail(),
    (0, express_validator_1.query)('page').isInt().toInt(),
    (0, express_validator_1.query)('limit').isInt().toInt(),
];
exports.validateFindNotesBetweenDatesandKeyword = [
    (0, express_validator_1.param)('fromDate').isISO8601().toDate(),
    (0, express_validator_1.param)('toDate').isISO8601().toDate(),
    (0, express_validator_1.query)('page').isInt().toInt(),
    (0, express_validator_1.query)('limit').isInt().toInt(),
];
exports.validateCreateNote = [(0, express_validator_1.body)('text').notEmpty()];
exports.validateEditNote = [
    (0, express_validator_1.body)('text').notEmpty(),
    (0, express_validator_1.param)('id').isMongoId(),
];
exports.validateDeleteNote = [(0, express_validator_1.param)('id').isMongoId()];
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
