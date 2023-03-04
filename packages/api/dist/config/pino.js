"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
// TODO: Add file path to log info
/*
   const pathName =
      path.basename(__dirname) + '/' + path.basename(__filename, '.js')
*/
const formatters = {
    bindings() {
        return { pid: '', hostname: '' };
    },
};
exports.logger = (0, pino_1.default)({
    level: process.env.LOG_LEVEL || 'info',
    formatters,
});
