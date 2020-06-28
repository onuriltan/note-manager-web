const express = require('express')
const jwtConfig = require('../../middlewares/jwt')
const passport = require('passport')
const {
  loginWithEmail,
  loginWithSocial,
  findUserWithConfirmationToken,
  registerWithEmail,
  resendConfirmationEmail,
} = require('./controller/auth/auth.controller')

const { getUser, changePassword } = require('./controller/user/user.controller')
const {
  validateRegisterWithEmail,
  validateLoginWithEmail,
  returnValidationErrors,
} = require('./validator')

const router = express.Router()
const authRoutes = express.Router()
const userRoutes = express.Router()

// Auth
router.use('/auth', authRoutes)
authRoutes.post(
  '/loginWithEmail',
  validateLoginWithEmail,
  returnValidationErrors,
  loginWithEmail
)
authRoutes.post(
  '/registerWithEmail',
  validateRegisterWithEmail,
  returnValidationErrors,
  registerWithEmail
)
authRoutes.get('/confirm/:confirmationToken', findUserWithConfirmationToken)
authRoutes.post('/resendConfirmationEmail', resendConfirmationEmail)

authRoutes.get(
  '/loginWithGoogle',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)
authRoutes.get(
  '/loginWithGoogle/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  loginWithSocial
)

authRoutes.get(
  '/loginWithFacebook',
  passport.authenticate('facebook', { scope: ['email'] })
)
authRoutes.get(
  '/loginWithFacebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  loginWithSocial
)

// User
router.use('/', userRoutes)
userRoutes.use(jwtConfig.verifyToken)
userRoutes.use(jwtConfig.decodeToken)
userRoutes.get('/', getUser)
userRoutes.post('/changePassword', changePassword)

module.exports = router
