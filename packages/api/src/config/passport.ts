import passport from 'passport'
import UserEntity from '../modules/user/entity/user.entity'
import FacebookStrategy from 'passport-facebook'
import GoogleStrategy from 'passport-google-oauth20'

import { logger } from './pino'

export const configurePassport = (): void => {
  passport.use(
    new FacebookStrategy.Strategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_APP_CALLBACK_URL,
        profileFields: ['id', 'emails', 'name'],
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          if (profile && profile.id && profile._json && profile._json.email) {
            const existingUser = await UserEntity.findOne({
              'facebook.id': profile.id,
            })
            if (existingUser) {
              return done(null, existingUser)
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
            done(null, newUser)
          } else {
            logger.error('Could not get email and facebookId of the user')
            done(null, false, 'An error occured while logging in with facebook')
          }
        } catch (e) {
          logger.error('An error occured from facebook login')
          if (e instanceof Error) {
            logger.error(e.message)
            done(e, false, e.message)
          }
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
      async (_accessToken, _refreshToken, profile, done) => {
        if (profile && profile.id && profile._json && profile._json.email) {
          try {
            const existingUser = await UserEntity.findOne({
              'google.id': profile.id,
            })
            if (existingUser) {
              return done('', existingUser)
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
            done('', newUser)
          } catch (e) {
            logger.error('An error occured from google login')
            if (e instanceof Error) {
              logger.error(e.message)
              done(e, false, e.message)
            }
          }
        } else {
          logger.error('Could not get email and googleId of the user')
          done('', false, 'An error occured while login with google')
        }
      }
    )
  )

  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    if (user) {
      done(null, user)
    }
  })
}
