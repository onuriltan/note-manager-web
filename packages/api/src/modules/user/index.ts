import express from 'express'
import { verifyToken, decodeToken } from '../../middlewares/jwt'
import passport from 'passport'
import {
  loginWithEmail,
  loginWithSocial,
  findUserWithConfirmationToken,
  registerWithEmail,
  resendConfirmationEmail,
} from './controller/auth/auth.controller'

import { getUser, changePassword } from './controller/user/user.controller'
import {
  validateRegisterWithEmail,
  validateLoginWithEmail,
  validateChangePassword,
  returnValidationErrors,
} from './validator'

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
userRoutes.use(verifyToken)
userRoutes.use(decodeToken)
userRoutes.get('/', getUser)
userRoutes.post('/changePassword', validateChangePassword, changePassword)

export default router
