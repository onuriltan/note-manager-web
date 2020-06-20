const passport = require('passport')
const UserEntity = require('../modules/user/entity/user')
const FacebookTokenStrategy = require('passport-facebook-token')
const { logger } = require('..config/pino')

exports.configurePassport = () => {
  passport.use(
    'facebook-token',
    new FacebookTokenStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
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
        } catch (e) {
          logger.error(e.message)
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
}
