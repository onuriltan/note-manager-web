"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurePassport = void 0;
const passport_1 = __importDefault(require("passport"));
const user_entity_1 = __importDefault(require("../modules/user/entity/user.entity"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const pino_1 = require("./pino");
const configurePassport = () => {
    passport_1.default.use(new passport_facebook_1.default.Strategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_APP_CALLBACK_URL,
        profileFields: ['id', 'emails', 'name'],
    }, async (_accessToken, _refreshToken, profile, done) => {
        try {
            if (profile && profile.id && profile._json && profile._json.email) {
                const existingUser = await user_entity_1.default.findOne({
                    'facebook.id': profile.id,
                });
                if (existingUser) {
                    return done(null, existingUser);
                }
                const newUser = new user_entity_1.default({
                    active: true,
                    method: 'facebook',
                    facebook: {
                        id: profile.id,
                        email: profile._json.email,
                    },
                });
                await newUser.save();
                done(null, newUser);
            }
            else {
                pino_1.logger.error('Could not get email and facebookId of the user');
                done(null, false, 'An error occured while logging in with facebook');
            }
        }
        catch (e) {
            pino_1.logger.error('An error occured from facebook login');
            if (e instanceof Error) {
                pino_1.logger.error(e.message);
                done(e, false, e.message);
            }
        }
    }));
    passport_1.default.use(new passport_google_oauth20_1.default.Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL,
    }, async (_accessToken, _refreshToken, profile, done) => {
        if (profile && profile.id && profile._json && profile._json.email) {
            try {
                const existingUser = await user_entity_1.default.findOne({
                    'google.id': profile.id,
                });
                if (existingUser) {
                    return done('', existingUser);
                }
                const newUser = new user_entity_1.default({
                    active: true,
                    method: 'google',
                    google: {
                        id: profile.id,
                        email: profile._json.email,
                    },
                });
                await newUser.save();
                done('', newUser);
            }
            catch (e) {
                pino_1.logger.error('An error occured from google login');
                if (e instanceof Error) {
                    pino_1.logger.error(e.message);
                    done(e, false, e.message);
                }
            }
        }
        else {
            pino_1.logger.error('Could not get email and googleId of the user');
            done('', false, 'An error occured while login with google');
        }
    }));
    passport_1.default.serializeUser(function (user, done) {
        done(null, user);
    });
    passport_1.default.deserializeUser(function (user, done) {
        if (user) {
            done(null, user);
        }
    });
};
exports.configurePassport = configurePassport;
