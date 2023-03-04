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
/* eslint-disable @typescript-eslint/no-explicit-any */
const noteService = __importStar(require("./note.service"));
const noteRepository = __importStar(require("../repository/note.repository"));
jest.mock('../repository/note.repository');
describe(`${noteService.findNotes.name} Service`, () => {
    it(`should call ${noteRepository.findNotes.name} from repostitory and return result`, async () => {
        // Arrange
        const mockEmail = 'onur@iltan.com';
        const mockLimitAndPage = {
            limit: 10,
            page: 1,
        };
        const findNotes = jest
            .spyOn(noteRepository, 'findNotes')
            .mockReturnValue('note');
        // Act
        const result = await noteService.findNotes(mockEmail, mockLimitAndPage);
        // Assert
        expect(findNotes).toHaveBeenCalledWith(mockEmail, {
            ...mockLimitAndPage,
            sort: { date: -1 },
        });
        expect(result).toBe('note');
    });
});
