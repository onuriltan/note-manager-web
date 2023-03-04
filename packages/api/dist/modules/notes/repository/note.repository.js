"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.editNote = exports.createNote = exports.findNotesBetweenDatesandKeyword = exports.findNotes = void 0;
const note_entity_1 = __importDefault(require("../entity/note.entity"));
const pino_1 = require("../../../config/pino");
const findNotes = async (email, options) => {
    const extendedOptions = { ...options, lean: true };
    try {
        return await note_entity_1.default.paginate({ email }, extendedOptions);
    }
    catch (e) {
        if (e instanceof Error) {
            if (e instanceof Error) {
                pino_1.logger.error(e);
            }
        }
        return false;
    }
};
exports.findNotes = findNotes;
const findNotesBetweenDatesandKeyword = async (fromDate, toDate, keyword, email, options) => {
    const extendedOptions = { ...options, lean: true, sort: { date: -1 } };
    const regex = new RegExp(`${keyword}`, 'i');
    const query = {
        email,
        createdAt: {
            $gte: fromDate,
            $lt: toDate,
        },
        text: '',
    };
    if (keyword && keyword !== ' ') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        query.text = { $regex: regex };
    }
    try {
        return await note_entity_1.default.paginate(query, extendedOptions);
    }
    catch (e) {
        if (e instanceof Error) {
            if (e instanceof Error) {
                pino_1.logger.error(e);
            }
        }
        return false;
    }
};
exports.findNotesBetweenDatesandKeyword = findNotesBetweenDatesandKeyword;
const createNote = async (text, email) => {
    try {
        return await new note_entity_1.default({
            text,
            email,
        }).save();
    }
    catch (e) {
        if (e instanceof Error) {
            if (e instanceof Error) {
                pino_1.logger.error(e);
            }
        }
        return null;
    }
};
exports.createNote = createNote;
const editNote = async (id, email, text) => {
    try {
        return await note_entity_1.default.findOneAndUpdate({ _id: id, email: email }, { text: text });
    }
    catch (e) {
        if (e instanceof Error) {
            if (e instanceof Error) {
                pino_1.logger.error(e);
            }
        }
        return null;
    }
};
exports.editNote = editNote;
const deleteNote = async (email, id) => {
    try {
        const deletedNote = await note_entity_1.default.deleteOne({
            _id: id,
            email,
        });
        return !!deletedNote;
    }
    catch (e) {
        if (e instanceof Error) {
            if (e instanceof Error) {
                pino_1.logger.error(e);
            }
        }
        return false;
    }
};
exports.deleteNote = deleteNote;
