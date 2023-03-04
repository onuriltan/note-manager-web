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
const jwt = __importStar(require("../../../../middlewares/jwt"));
const authService = __importStar(require("../../service/auth/auth.service"));
const auth_controller_1 = require("./auth.controller");
jest.mock('../../../../middlewares/jwt');
jest.mock('../../repository/auth');
jest.mock('../../service/auth/auth.service');
describe('loginWithSocial tests', () => {
    const mockRequest = {
        user: {
            method: 'facebook',
        },
    };
    const mockResponse = {
        json: jest.fn(),
        status: jest.fn(),
        redirect: jest.fn(),
    };
    const OLD_ENV = process.env;
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules(); // most important - it clears the cache
        process.env = { ...OLD_ENV }; // make a copy
    });
    afterAll(() => {
        process.env = OLD_ENV; // restore old env
    });
    it('should call jwt.signToken and call the res.json with jwt.signToken result', async () => {
        // Arrange
        const req = { ...mockRequest };
        const res = { ...mockResponse };
        const signToken = jest
            .spyOn(jwt, 'signToken')
            .mockResolvedValue('token');
        process.env.CLIENT_URL = 'http://localhost:8080';
        // Act
        await (0, auth_controller_1.loginWithSocial)(req, res);
        // Assert
        expect(signToken).toHaveBeenCalledWith(req.user);
        expect(res.redirect).toHaveBeenCalledWith(`${process.env.CLIENT_URL}/login/?${req.user.method}Token=${encodeURIComponent('token')}`);
    });
    it('should call res.status as 401 if no user is in the req object', async () => {
        // Arrange
        const req = { ...mockRequest, user: null };
        const res = { ...mockResponse };
        // Act
        await (0, auth_controller_1.loginWithSocial)(req, res);
        // Assert
        expect(res.redirect).toHaveBeenCalledWith(`${process.env.CLIENT_URL}/not-found`);
    });
});
describe('registerWithEmail tests', () => {
    let req;
    let res;
    beforeEach(() => {
        const resStatus = jest.fn();
        const resSend = jest.fn();
        const resJson = jest.fn();
        res = {
            status: resStatus,
            send: resSend,
            json: resJson,
        };
        resStatus.mockImplementation(() => res);
        resSend.mockImplementation(() => res);
        resJson.mockImplementation(() => res);
    });
    it('should not find existing user and send confirmation mail to the new user', async () => {
        // Arrange
        req = {
            body: { email: 'onur@iltan.com', password: '1234' },
        };
        const register = jest
            .spyOn(authService, 'registerWithEmail')
            .mockResolvedValue(true);
        // Act
        await (0, auth_controller_1.registerWithEmail)(req, res);
        // Assert
        expect(register).toHaveBeenCalledWith(req.body.email, req.body.password);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            messages: [{ msg: 'Check your email to confirm your account!' }],
        });
    });
});
