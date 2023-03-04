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
exports.deleteNote = exports.editNote = exports.createNote = exports.findNotesBetweenDatesandKeyword = exports.findNotes = void 0;
const noteRepository = __importStar(require("../repository/note.repository"));
const noteService = __importStar(require("../service/note.service"));
const findNotes = async (req, res) => {
    const { email, limit, page } = req.query;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const notes = await noteService.findNotes(email, { limit, page });
    return res.send(notes);
};
exports.findNotes = findNotes;
const findNotesBetweenDatesandKeyword = async (req, res) => {
    const { email, limit, page } = req.query;
    const fromDate = new Date(req.params.fromDate);
    const toDate = new Date(req.params.toDate);
    const keyword = req.params.keyword;
    const notes = await noteRepository.findNotesBetweenDatesandKeyword(fromDate, toDate, keyword, 
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    email, { page, limit });
    return res.send(notes);
};
exports.findNotesBetweenDatesandKeyword = findNotesBetweenDatesandKeyword;
const createNote = async (req, res) => {
    const { email } = req.query;
    const { text } = req.body;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const newPost = await noteRepository.createNote(text, email);
    return res.status(201).send(newPost);
};
exports.createNote = createNote;
const editNote = async (req, res) => {
    const { email } = req.query;
    const { text } = req.body;
    const id = req.params.id;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const updatedNote = await noteRepository.editNote(id, email, text);
    return res.send(updatedNote);
};
exports.editNote = editNote;
const deleteNote = async (req, res) => {
    const { email } = req.query;
    const id = req.params.id;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const deletedNote = await noteRepository.deleteNote(email, id);
    return deletedNote ? res.status(201).send() : res.status(400).send();
};
exports.deleteNote = deleteNote;
