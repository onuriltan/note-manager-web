"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../../middlewares/jwt");
const validator_1 = require("./validator");
const note_controller_1 = require("./controller/note.controller");
const router = express_1.default.Router();
// Middlewares
router.use(jwt_1.verifyToken);
router.use(jwt_1.decodeToken);
router.get('/', validator_1.validateFindNotes, validator_1.returnValidationErrors, note_controller_1.findNotes);
router.get('/:fromDate/:toDate/:keyword', validator_1.validateFindNotesBetweenDatesandKeyword, validator_1.returnValidationErrors, note_controller_1.findNotesBetweenDatesandKeyword);
router.post('/', validator_1.validateCreateNote, validator_1.returnValidationErrors, note_controller_1.createNote);
router.put('/:id', validator_1.validateEditNote, validator_1.returnValidationErrors, note_controller_1.editNote);
router.delete('/:id', validator_1.validateDeleteNote, validator_1.returnValidationErrors, note_controller_1.deleteNote);
exports.default = router;
