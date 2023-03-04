"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../../middlewares/jwt");
const passport_1 = __importDefault(require("passport"));
const auth_controller_1 = require("./controller/auth/auth.controller");
const user_controller_1 = require("./controller/user/user.controller");
const validator_1 = require("./validator");
const router = express_1.default.Router();
const authRoutes = express_1.default.Router();
const userRoutes = express_1.default.Router();
// Auth
router.use('/auth', authRoutes);
authRoutes.post('/loginWithEmail', validator_1.validateLoginWithEmail, validator_1.returnValidationErrors, auth_controller_1.loginWithEmail);
authRoutes.post('/registerWithEmail', validator_1.validateRegisterWithEmail, validator_1.returnValidationErrors, auth_controller_1.registerWithEmail);
authRoutes.get('/confirm/:confirmationToken', auth_controller_1.findUserWithConfirmationToken);
authRoutes.post('/resendConfirmationEmail', auth_controller_1.resendConfirmationEmail);
authRoutes.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
authRoutes.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: process.env.CLIENT_URL }), auth_controller_1.loginWithSocial);
authRoutes.get('/facebook', passport_1.default.authenticate('facebook', { scope: ['email'] }));
authRoutes.get('/facebook/callback', passport_1.default.authenticate('facebook', {
    failureRedirect: process.env.CLIENT_URL,
}), auth_controller_1.loginWithSocial);
// User
router.use('/', userRoutes);
userRoutes.use(jwt_1.verifyToken);
userRoutes.use(jwt_1.decodeToken);
userRoutes.get('/', user_controller_1.getUser);
userRoutes.post('/changePassword', validator_1.validateChangePassword, user_controller_1.changePassword);
exports.default = router;
