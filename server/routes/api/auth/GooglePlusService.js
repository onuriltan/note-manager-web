const express = require('express');
const router = express.Router();
const JwtOperations = require('../../../config/JwtOperations');

const User = require('./entity/User');

const passport = require('passport');
const googlePlusTokenStrategy = require('passport-google-plus-token');

passport.use("google-token", new googlePlusTokenStrategy({
        clientID: process.env.GOOGLE_APP_ID,
        clientSecret: process.env.GOOGLE_APP_SECRET,
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const existingUser = await User.findOne({ "google.id": profile.id});
            if (existingUser) {
                return done(null, existingUser);
            }
            const newUser = new User({
                method: 'google',
                active: true,
                google: {
                    id: profile.id,
                    email: profile._json.emails[0].value
                }
            });
            await newUser.save();
            done(null, newUser)

        } catch (e) {
            console.log(e.message);
            done(e, false, e.message);
        }
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

router.post('/',
    passport.authenticate('google-token'),
    async function (req, res) {
        if (req.user) {
            let token = await JwtOperations.signToken(req.user, 'theSecretKey');
            res.json({token});
        } else {
            res.status(401);
        }
    })

module.exports = router;

