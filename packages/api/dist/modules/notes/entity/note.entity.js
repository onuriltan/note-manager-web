"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
const NoteSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
}, { timestamps: true });
NoteSchema.plugin(mongoose_paginate_1.default);
exports.default = (0, mongoose_1.model)('Note', NoteSchema);
