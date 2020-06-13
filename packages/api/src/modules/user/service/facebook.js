const express = require('express')
const router = express.Router()
const JwtOperations = require('../../../middlewares/jwt')

const User = require('../entity/user')
const passport = require('passport')
const FacebookTokenStrategy = require('passport-facebook-token')

passport.use(
  'facebook-token',
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ 'facebook.id': profile.id })
        if (existingUser) {
          return done(null, existingUser)
        }
        const newUser = new User({
          active: true,
          method: 'facebook',
          facebook: {
            id: profile.id,
            email: profile._json.email,
          },
        })
        await newUser.save()
        done(null, newUser)
      } catch (e) {
        console.log(e.message)
        done(e, false, e.message)
      }
    }
  )
)

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

router.post('/', passport.authenticate('facebook-token'), async function (
  req,
  res
) {
  if (req.user) {
    const token = await JwtOperations.signToken(req.user)
    res.json({ token })
  } else {
    res.status(401)
  }
})

module.exports = router
