const express = require('express')
const jwtConfig = require('../../middlewares/jwt')
const passport = require('passport')
const {
  loginWithEmail,
  findUserWithConfirmationToken,
  registerWithEmail,
  resendConfirmationEmail,
} = require('./controller/auth.controller')
const { loginWithFacebook } = require('./controller/facebook.contoller')
const { getUser, changePassword } = require('./controller/user.controller')
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
authRoutes.post(
  '/loginWithFacebook',
  passport.authenticate('facebook-token'),
  loginWithFacebook
)

// User
router.use('/', userRoutes)
userRoutes.use(jwtConfig.verifyToken)
userRoutes.use(jwtConfig.decodeToken)
userRoutes.get('/', getUser)
userRoutes.post('/changePassword', changePassword)

module.exports = router
