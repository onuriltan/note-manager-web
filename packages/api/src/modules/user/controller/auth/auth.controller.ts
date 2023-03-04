import bcrypt from 'bcrypt'
import * as authRepository from '../../repository/auth'
import * as authService from '../../service/auth/auth.service'
import * as jwt from '../../../../middlewares/jwt'
import { logger } from '../../../../config/pino'
import { Request, Response } from 'express'

interface ReturnType {
  msg: string
}

export const loginWithSocial = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (req?.user?.method) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const token = await jwt.signToken(req.user)
    if (token) {
      return res.redirect(
        `${process.env.CLIENT_URL}/login/?${
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          req.user.method
        }Token=${encodeURIComponent(token)}`
      )
    } else {
      return res.redirect(`${process.env.CLIENT_URL}/not-found`)
    }
  } else {
    return res.redirect(`${process.env.CLIENT_URL}/not-found`)
  }
}

export const loginWithEmail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body
  const errors: ReturnType[] = []
  const user = await authRepository.findUser(email)
  if (user?.local?.password) {
    const isPasswordCorrect = bcrypt.compareSync(password, user.local.password)
    if (!user.active) {
      errors.push({ msg: 'You need to activate your account' })
      return res.status(401).json({ errors })
    } else if (user.active && isPasswordCorrect) {
      const token = jwt.signToken(user)
      return res.json({ token, method: user.method })
    } else {
      errors.push({ msg: 'Username or password is wrong' })
      return res.status(401).json({ errors })
    }
  } else {
    errors.push({ msg: 'Username or password is wrong' })
    return res.status(401).json({ errors })
  }
}

export const registerWithEmail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body
  const errors: ReturnType[] = []
  const messages: ReturnType[] = []
  const isSent = await authService.registerWithEmail(email, password)
  if (isSent) {
    messages.push({ msg: 'Check your email to confirm your account!' })
    return res.status(200).json({ messages })
  } else {
    errors.push({
      msg: 'An error occurred while sending confirmation email',
    })
    return res.status(400).json({ errors })
  }
}

export const resendConfirmationEmail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body
  const errors: ReturnType[] = []
  const messages: ReturnType[] = []
  const isSent = await authService.resendConfirmationMail(email, password)
  if (isSent) {
    messages.push({ msg: 'Confirmation email is resent!' })
    return res.status(200).json({ messages })
  } else {
    errors.push({ msg: 'An error occurred' })
    return res.status(400).json({ errors })
  }
}

export const findUserWithConfirmationToken = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const errors: ReturnType[] = []
  const confirmationToken = req.params.confirmationToken
  const user = await authRepository.findUserWithConfirmationToken(
    confirmationToken
  )
  if (user) {
    const expiry = user.confirmationTokenExpiry?.getDate()
    const compare = new Date().setDate(new Date().getDate() + 3)
    if (expiry && expiry < compare) {
      user.confirmationToken = undefined
      user.confirmationTokenExpiry = undefined
      user.active = true
      try {
        const updatedUser = await user.save()
        logger.info(
          `User is activated by confirmation token: ${updatedUser?.local?.email}`
        )
      } catch (e) {
        if (e instanceof Error) {
          logger.error(e)
        }
      }
      const token = await jwt.signToken(user)
      res.json({ token })
    } else {
      await authRepository.deleteUser(user._id.toString())
      errors.push({ msg: 'Your account is expired, please re-register again' })
      return res.status(401).json({ errors })
    }
  }
  errors.push({ msg: 'No new user found with that token' })
  return res.status(404).json({ errors })
}
