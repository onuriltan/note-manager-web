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
const user_entity_1 = require("../../entity/user.entity");
const userRepository = __importStar(require("../../repository/user"));
const user_controller_1 = require("./user.controller");
jest.mock('../../repository/user');
jest.mock('lodash');
describe('getUser tests', () => {
    let mockRequest;
    let mockResponse;
    beforeEach(() => {
        mockRequest = { query: { email: 'onur@gmail.com' } };
        const resStatus = jest.fn();
        const resSend = jest.fn();
        mockResponse = {
            status: resStatus,
            send: resSend,
        };
        resStatus.mockImplementation(() => mockResponse);
        resSend.mockImplementation(() => mockResponse);
    });
    it('should call userRepository.getUser and returns as result', async () => {
        // Arrange
        const user = {
            active: true,
            method: user_entity_1.SignUpMethod.LOCAL,
            confirmationToken: 'confirmationToken',
        };
        const getUserRepo = jest
            .spyOn(userRepository, 'getUser')
            .mockResolvedValue(user);
        // Act
        await (0, user_controller_1.getUser)(mockRequest, mockResponse);
        // Assert
        expect(getUserRepo).toHaveBeenCalledWith(mockRequest?.query?.email);
        expect(mockResponse.send).toHaveBeenCalledWith(user);
    });
    it('should call userRepository.getUser and returns response with status 404', async () => {
        // Arrange
        const getUserRepo = jest
            .spyOn(userRepository, 'getUser')
            .mockResolvedValue(null);
        // Act
        await (0, user_controller_1.getUser)(mockRequest, mockResponse);
        // Assert
        expect(getUserRepo).toHaveBeenCalledWith(mockRequest?.query?.email);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.send).toHaveBeenCalledWith();
    });
});
