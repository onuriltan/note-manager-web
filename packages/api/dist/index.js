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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = __importDefault(require("mongoose"));
const helmet_1 = __importDefault(require("helmet"));
const passport_2 = require("./config/passport");
const pino_1 = require("./config/pino");
const migrations_1 = require("./migrations");
const dotenv = __importStar(require("dotenv"));
const notes_1 = __importDefault(require("./modules/notes"));
const user_1 = __importDefault(require("./modules/user"));
require('module-alias/register');
const bootServer = async () => {
    // Environment Variables
    dotenv.config();
    // Middleware
    const server = (0, express_1.default)();
    server.use(body_parser_1.default.json());
    server.use((0, cors_1.default)());
    server.use((0, cookie_parser_1.default)());
    server.use(passport_1.default.initialize());
    server.use((0, helmet_1.default)());
    // Connect to Mongo
    try {
        pino_1.logger.warn('Connecting to MongoDB...');
        await mongoose_1.default.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        pino_1.logger.info('MongoDB connected.');
    }
    catch (e) {
        pino_1.logger.error('MongoDB failed to connect.');
        if (e instanceof Error) {
            throw e;
        }
    }
    // Run Mongo migrations
    await (0, migrations_1.configureAndRunMigrations)();
    (0, passport_2.configurePassport)();
    // Routes
    server.use('/', (_, res) => {
        res.send('Alive');
    });
    server.use('/api/notes', notes_1.default);
    server.use('/api/user', user_1.default);
    const port = process.env.PORT || 5000;
    server.listen(port);
};
bootServer()
    .then(() => {
    pino_1.logger.info('Server is ready.');
})
    .catch((e) => {
    pino_1.logger.error('Server is failed to boot.');
    if (e instanceof Error) {
        pino_1.logger.error(e);
    }
});
