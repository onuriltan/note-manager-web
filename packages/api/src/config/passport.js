const passport = require('passport')
const UserEntity = require('../modules/user/entity/user')
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy

const { logger } = require('./pino')

exports.configurePassport = () => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_APP_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, callback) => {
        try {
          const existingUser = await UserEntity.findOne({
            'facebook.id': profile.id,
          })
          if (existingUser) {
            return callback(null, existingUser)
          }
          const newUser = new UserEntity({
            active: true,
            method: 'facebook',
            facebook: {
              id: profile.id,
              email: profile._json.email,
            },
          })
          await newUser.save()
          callback(null, newUser)
        } catch (e) {
          logger.error(e.message)
          callback(e, false, e.message)
        }
      }
    )
  )

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, callback) => {
        try {
          const existingUser = await UserEntity.findOne({
            'google.id': profile.id,
          })
          if (existingUser) {
            return callback(null, existingUser)
          }
          const newUser = new UserEntity({
            active: true,
            method: 'google',
            google: {
              id: profile.id,
              email: profile._json.email,
            },
          })
          await newUser.save()
          callback(null, newUser)
        } catch (e) {
          logger.error(e.message)
          callback(e, false, e.message)
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
}
