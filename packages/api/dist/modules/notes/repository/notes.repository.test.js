"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const note_entity_1 = __importDefault(require("../entity/note.entity"));
const note_repository_1 = require("./note.repository");
const pino_1 = require("../../../config/pino");
jest.mock('../entity/note.entity');
jest.mock('../../../config/pino');
describe(`findNotes repository`, () => {
    const loggerError = jest.spyOn(pino_1.logger, 'error');
    beforeEach(() => jest.clearAllMocks());
    it(`should return the result of NoteEntity.paginate`, async () => {
        // Arrange
        const email = 'onur@iltan.com';
        const options = {};
        const paginate = jest
            .spyOn(note_entity_1.default, 'paginate')
            .mockResolvedValue([]);
        // Act
        await (0, note_repository_1.findNotes)(email, options);
        // Assert
        expect(paginate).toHaveBeenCalledWith({ email }, { ...options, lean: true });
    });
    it(`should log the error if NoteEntity.paginate throws error`, async () => {
        // Arrange
        const email = 'onur@iltan.com';
        const options = {};
        jest.spyOn(note_entity_1.default, 'paginate').mockRejectedValue('database error');
        // Act
        await (0, note_repository_1.findNotes)(email, options);
        // Assert
        expect(loggerError).toHaveBeenCalledWith('database error');
    });
});
describe(`findNotesBetweenDatesandKeyword repository`, () => {
    const fromDate = new Date(1995, 11, 17);
    const toDate = new Date(1995, 11, 18);
    const keyword = 'keyword';
    const email = 'onur@iltan.com';
    const options = {};
    const paginate = jest.spyOn(note_entity_1.default, 'paginate').mockReturnValue([]);
    const loggerError = jest.spyOn(pino_1.logger, 'error');
    beforeEach(() => jest.clearAllMocks());
    it(`should return the result of NoteEntity.paginate`, async () => {
        // Arrange
        const query = {
            email: email,
            createdAt: {
                $gte: fromDate,
                $lt: toDate,
            },
            text: { $regex: new RegExp(`${keyword}`, 'i') },
        };
        // Act
        await (0, note_repository_1.findNotesBetweenDatesandKeyword)(fromDate, toDate, keyword, email, options);
        // Assert
        expect(paginate).toHaveBeenCalledWith(query, {
            ...options,
            lean: true,
            sort: { date: -1 },
        });
    });
    it(`should not add text to query if no keyword is coming`, async () => {
        // Arrange
        const keyword = '';
        const query = {
            email: email,
            createdAt: {
                $gte: fromDate,
                $lt: toDate,
            },
            text: '',
        };
        // Act
        await (0, note_repository_1.findNotesBetweenDatesandKeyword)(fromDate, toDate, keyword, email, options);
        // Assert
        expect(paginate).toHaveBeenCalledWith(query, {
            ...options,
            lean: true,
            sort: { date: -1 },
        });
    });
    it(`should log the error if NoteEntity.paginate throws error`, async () => {
        // Arrange
        const keyword = '';
        // Act
        await (0, note_repository_1.findNotesBetweenDatesandKeyword)(fromDate, toDate, keyword, email, options);
        // Assert
        expect(loggerError).toHaveBeenCalledWith('database error');
    });
});
describe(`createNote Repository`, () => {
    const loggerError = jest.spyOn(pino_1.logger, 'error');
    beforeEach(() => jest.clearAllMocks());
    it(`should return the result of NoteEntity.save`, async () => {
        // Arrange
        const email = 'onur@iltan.com';
        const text = 'text';
        const save = (note_entity_1.default.prototype.save = jest
            .fn()
            .mockResolvedValue({ text, email }));
        // Act
        const result = await (0, note_repository_1.createNote)(text, email);
        // Assert
        expect(note_entity_1.default).toHaveBeenCalledWith({
            text,
            email,
        });
        expect(save).toHaveBeenCalledWith();
        expect(result).toEqual({ text, email });
    });
    it(`should log the error if NoteEntity.paginate throws error`, async () => {
        // Arrange
        const email = 'onur@iltan.com';
        const text = 'text';
        note_entity_1.default.prototype.save = jest.fn().mockRejectedValue('database error');
        // Act
        await (0, note_repository_1.createNote)(text, email);
        // Assert
        expect(loggerError).toHaveBeenCalledWith('database error');
    });
});
describe(`editNote Repository`, () => {
    const loggerError = jest.spyOn(pino_1.logger, 'error');
    const id = 'asd324rsdf2';
    const email = 'onur@iltan.com';
    const text = 'text';
    beforeEach(() => jest.clearAllMocks());
    it(`should return the result of NoteEntity.findOneAndUpdate`, async () => {
        // Arrange
        jest
            .spyOn(note_entity_1.default, 'findOneAndUpdate')
            .mockResolvedValue({ text, email });
        // Act
        const result = await (0, note_repository_1.editNote)(id, email, text);
        // Assert
        expect(note_entity_1.default.findOneAndUpdate).toHaveBeenCalledWith({ _id: id, email }, { text });
        expect(result).toEqual({ text, email });
    });
    it(`should log the error if NoteEntity.findOneAndUpdate throws error`, async () => {
        // Arrange
        jest
            .spyOn(note_entity_1.default, 'findOneAndUpdate')
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .mockRejectedValue('database error');
        // Act
        await (0, note_repository_1.editNote)(id, email, text);
        // Assert
        expect(loggerError).toHaveBeenCalledWith('database error');
    });
});
describe(`deleteNote repository`, () => {
    const loggerError = jest.spyOn(pino_1.logger, 'error');
    const id = 'asd324rsdf2';
    const email = 'onur@iltan.com';
    beforeEach(() => jest.clearAllMocks());
    it(`should return true if NoteEntity.deleteOne is not empty`, async () => {
        // Arrange
        jest.spyOn(note_entity_1.default, 'deleteOne').mockResolvedValue('');
        // Act
        const result = await (0, note_repository_1.deleteNote)(email, id);
        // Assert
        expect(note_entity_1.default.deleteOne).toHaveBeenCalledWith({
            _id: id,
            email,
        });
        expect(result).toEqual(false);
    });
    it(`should return false if NoteEntity.deleteOne is empty`, async () => {
        // Arrange
        jest.spyOn(note_entity_1.default, 'deleteOne').mockResolvedValue({ _id: id });
        // Act
        const result = await (0, note_repository_1.deleteNote)(email, id);
        // Assert
        expect(note_entity_1.default.deleteOne).toHaveBeenCalledWith({
            _id: id,
            email,
        });
        expect(result).toEqual(true);
    });
    it(`should log the error if NoteEntity.deleteOne throws error`, async () => {
        // Arrange
        jest.spyOn(note_entity_1.default, 'deleteOne').mockRejectedValue('database error');
        // Act
        await (0, note_repository_1.deleteNote)(email, id);
        // Assert
        expect(loggerError).toHaveBeenCalledWith('database error');
    });
});
