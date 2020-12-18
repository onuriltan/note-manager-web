import passport from 'passport'
import UserEntity from '../modules/user/entity/user'
import FacebookStrategy from 'passport-facebook'
import GoogleStrategy from 'passport-google-oauth20'

import { logger } from './pino'

export const configurePassport = () => {
  passport.use(
    new FacebookStrategy.Strategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_APP_CALLBACK_URL,
        profileFields: ['id', 'emails', 'name'],
      },
      async (accessToken, refreshToken, profile, callback) => {
        try {
          if (profile && profile.id && profile._json && profile._json.email) {
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
          } else {
            logger.error('Could not get email and facebookId of the user')
            callback(
              null,
              false,
              'An error occured while logging in with facebook'
            )
          }
        } catch (e) {
          logger.error(e.message)
          callback(e, false, e.message)
        }
      }
    )
  )

  passport.use(
    new GoogleStrategy.Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, callback) => {
        if (profile && profile.id && profile._json && profile._json.email) {
          try {
            const existingUser = await UserEntity.findOne({
              'google.id': profile.id,
            })
            if (existingUser) {
              return callback('', existingUser)
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
            callback('', newUser)
          } catch (e) {
            logger.error(e.message)
            callback(e, false, e.message)
          }
        } else {
          logger.error('Could not get email and googleId of the user')
          callback('', false, 'An error occured while login with google')
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