const express = require('express');
const router = express.Router();
const UserDbService = require('./db/UserDbService');

const passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
        clientID: "534567813717942",
        clientSecret: "e8d4629725a512c2801228e369616317",
        callbackURL: "http://localhost:5000/login"
    },
    function (accessToken, refreshToken, profile, done) {
        console.log(accessToken)
        console.log(refreshToken)
        console.log(profile)
    }
));

router.get('/', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/callback',
    passport.authenticate('facebook', { successRedirect: '/dashboard',
        failureRedirect: '/login' }));


module.exports = router;
