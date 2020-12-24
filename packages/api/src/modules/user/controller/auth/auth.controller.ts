import * as authService from '../../service/auth/auth.service'
import * as jwt from '../../../../middlewares/jwt'
import { Request, Response } from 'express'

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
  const { errors, message } = await authService.loginWithEmail(email, password)
  return errors.length > 0
    ? res.status(400).json({ errors: errors })
    : res.status(200).json(message)
}

export const registerWithEmail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body
  const { errors, messages } = await authService.registerWithEmail(
    email,
    password
  )
  return errors.length > 0
    ? res.status(400).json({ errors: errors })
    : res.status(200).json({ messages: messages })
}

export const resendConfirmationEmail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body
  const { errors, messages } = await authService.resendConfirmationMail(
    email,
    password
  )
  return errors.length > 0
    ? res.status(400).json({ errors: errors })
    : res.status(200).json({ messages: messages })
}

export const findUserWithConfirmationToken = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const confirmationToken = req.params.confirmationToken
  const { errors, message } = await authService.findUserWithConfirmationToken(
    confirmationToken
  )
  return errors.length > 0
    ? res.status(400).json({ errors: errors })
    : res.status(200).json(message)
}
