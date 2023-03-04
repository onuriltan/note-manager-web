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
const mail = __importStar(require("../../../../config/mail"));
const pino_1 = require("../../../../config/pino");
const user_entity_1 = require("../../entity/user.entity");
const auth_service_1 = require("./auth.service");
jest.mock('../../../../config/mail');
jest.mock('../../../../config/pino');
describe('authService tests', () => {
    const user = {
        active: true,
        method: user_entity_1.SignUpMethod.LOCAL,
        local: {
            email: 'user@gmail.com',
            password: '123',
        },
        confirmationToken: 'confirmationToken',
    };
    beforeEach(() => {
        pino_1.logger.info = jest.fn();
        pino_1.logger.error = jest.fn();
    });
    it(`should send confirmation mail with necessary parameteres from user object`, async () => {
        // Arrange
        jest.spyOn(mail, 'sendConfirmationMail').mockResolvedValue();
        // Act
        await (0, auth_service_1.sendConfirmationMail)(user);
        // Assert
        expect(mail.sendConfirmationMail).toHaveBeenCalledWith(user?.local?.email, user.confirmationToken);
    });
    it(`should log error if sendConfirmationMail fails`, async () => {
        // Arrange
        jest.spyOn(mail, 'sendConfirmationMail').mockRejectedValue('fail');
        // Act
        await (0, auth_service_1.sendConfirmationMail)(user);
        // Assert
        expect(mail.sendConfirmationMail).toHaveBeenCalledWith(user?.local?.email, user.confirmationToken);
    });
});
