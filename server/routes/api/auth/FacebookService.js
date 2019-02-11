const express = require('express');
const router = express.Router();
const UserDbService = require('./db/UserDbService');
const AuthDbService = require('./db/AuthDbService');

const User = require('./entity/User');

const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');

passport.use(new FacebookTokenStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const existingUser = await AuthDbService.findUser(profile._json.email);
            if (existingUser) {
                return done(null, existingUser);
            }
            const newUser = new User({
                active: true,
                confirmationTokenExpiry: null,
                email: profile._json.email,
                facebook: {
                    id: profile.id,
                    email: profile._json.email
                }
            });
            await AuthDbService.createUserWithFacebook(newUser);
            done(null, newUser)

        } catch (e) {
            done(e, false, e.message)
        }
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

router.post('/',
    passport.authenticate('facebook-token'),
    function (req, res) {
        console.log(req.user)
        res.send(req.user)
    })

module.exports = router;
