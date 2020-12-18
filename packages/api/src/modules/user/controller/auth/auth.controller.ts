import bcrypt from 'bcrypt'
import * as authRepository from '../../repository/auth'
import * as authService from '../../service/auth/auth.service'
import * as jwt from '../../../../middlewares/jwt'
import { logger } from '../../../../config/pino'
import { Request, Response } from 'express'

export const loginWithSocial = async (req: Request, res: Response) => {
  if (req.user) {
    const token = await jwt.signToken(req.user)
    res.redirect(
      `${process.env.CLIENT_URL}/login/?${
        // @ts-ignore
        req.user.method
        // @ts-ignore
      }Token=${encodeURIComponent(token)}`
    )
  } else {
    res.status(401)
  }
}

export const loginWithEmail = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const errors = [] as any
  const user = await authRepository.findUser(email)
  if (user) {
    // @ts-ignore
    const isPasswordCorrect = bcrypt.compareSync(password, user.local.password)
    if (!user.active) {
      errors.push({ msg: 'You need to activate your account' })
      res.status(401).json({ errors })
    } else if (user.active && isPasswordCorrect) {
      // @ts-ignore
      const token = await jwt.signToken(user, process.env.JWT_SECRET)
      res.json({ token, method: user.method })
    } else {
      errors.push({ msg: 'Username or password is wrong' })
      res.status(401).json({ errors })
    }
  } else {
    errors.push({ msg: 'Username or password is wrong' })
    res.status(401).json({ errors })
  }
}

export const registerWithEmail = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const errors = [] as any
  const messages = [] as any
  // @ts-ignore
  const foundUser = await authRepository.findUser(email, password)
  if (!foundUser) {
    const newUser = await authRepository.createUser(email, password)
    if (newUser) {
      const isConfirmationEmailSent = authService.sendConfirmationMail(newUser)
      if (isConfirmationEmailSent) {
        messages.push({ msg: 'Check your email to confirm your account!' })
        res.status(200).json({ messages })
      } else {
        errors.push({ msg: 'An error occurred, please try again' })
        res.status(400).json({ errors })
      }
    } else {
      // @ts-ignore
      await authRepository.deleteUser(newUser.id)
      errors.push({ msg: 'An error occurred' })
      res.status(400).json({ messages })
    }
  } else {
    errors.push({ msg: 'This email is already registered' })
    res.status(400).json({ errors })
  }
}

export const resendConfirmationEmail = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const errors = [] as any
  const messages = [] as any
  const foundUser = await authRepository.findUser(email)
  if (foundUser && !foundUser.active) {
    // @ts-ignore
    const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password)
    if (isPasswordCorrect) {
      const user = await authRepository.regenerateUserConfirmationToken(email)
      if (user) {
        const isConfirmationEmailSent = authService.sendConfirmationMail(user)
        if (isConfirmationEmailSent) {
          messages.push({ msg: 'Confirmation email is resent!' })
          res.status(200).json({ messages })
        } else {
          errors.push({ msg: 'An error occurred, please try again' })
          res.status(400).json({ errors })
        }
      }
    } else {
      errors.push({ msg: 'Username or password is wrong' })
      res.status(400).json({ errors })
    }
  } else {
    errors.push({ msg: 'An error occurred' })
    res.status(400).json({ errors })
  }
}

export const findUserWithConfirmationToken = async (
  req: Request,
  res: Response
) => {
  const errors = [] as any
  const confirmationToken = req.params.confirmationToken
  const user = await authRepository.findUserWithConfirmationToken(
    confirmationToken
  )
  if (user) {
    const expiry = user.confirmationTokenExpiry
    const compare = new Date().setDate(new Date().getDate() + 3)
    // @ts-ignore
    if (expiry < compare) {
      user.confirmationToken = undefined
      user.confirmationTokenExpiry = undefined
      user.active = true
      try {
        const updatedUser = await user.save()
        logger.info(
          // @ts-ignore
          `User is activated by confirmation token: ${updatedUser.local.email}`
        )
      } catch (e) {
        logger.error(e)
      }
      const token = await jwt.signToken(user)
      res.json({ token })
    } else {
      await authRepository.deleteUser(user.id)
      errors.push({ msg: 'Your account is expired, please re-register again' })
      res.status(401).json({ errors })
    }
  } else {
    errors.push({ msg: 'No new user found with that token' })
    res.status(404).json({ errors })
  }
}
