import * as mail from '../../../../config/mail'
import { SignUpMethod, UserEntityInput } from '../../entity/user.entity'
import * as authRepository from '../../repository/auth'
import * as jwt from '../../../../middlewares/jwt'
import bcrypt from 'bcrypt'
import { logger } from '../../../../config/pino'

export interface ResponseBody {
  msg: string
}
export interface AuthServiceResonse {
  errors: ResponseBody[]
  messages: ResponseBody[]
}

export interface LoginWithEmailResonse {
  errors: ResponseBody[]
  message: {
    token: string
    method: SignUpMethod
  }
}
export interface FindUserWithConfirmationToken {
  errors: ResponseBody[]
  message: {
    token: string
  }
}

export const loginWithEmail = async (
  email: string,
  password: string
): Promise<LoginWithEmailResonse> => {
  const res: LoginWithEmailResonse = {
    errors: [],
    message: {
      token: '',
      method: SignUpMethod.LOCAL,
    },
  }
  const { errors, message } = res
  const user = await authRepository.findUser(email)
  if (user?.local?.password) {
    const isPasswordCorrect = bcrypt.compareSync(password, user.local.password)
    if (!user.active) {
      errors.push({ msg: 'You need to activate your account' })
    } else if (user.active && isPasswordCorrect) {
      const token = jwt.signToken(user)
      message.token = token
      message.method = user.method
    } else {
      errors.push({ msg: 'Username or password is wrong' })
    }
  } else {
    errors.push({ msg: 'Username or password is wrong' })
  }
  return res
}

export const resendConfirmationMail = async (
  email: string,
  password: string
): Promise<AuthServiceResonse> => {
  const res: AuthServiceResonse = {
    errors: [],
    messages: [],
  }
  const { errors, messages } = res
  try {
    const foundUser = await authRepository.findUser(email)
    if (foundUser && !foundUser.active && foundUser.password) {
      const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password)
      if (isPasswordCorrect) {
        const user = await authRepository.regenerateUserConfirmationToken(email)
        if (user) {
          const isConfirmationMailSent = await sendConfirmationMail(user)
          isConfirmationMailSent
            ? messages.push({
                msg: 'Confirmation email is resent',
              })
            : errors.push({
                msg: 'An error occured when sending confirmation email',
              })
        }
      } else {
        messages.push({ msg: 'Password is not correct' })
      }
    } else {
      messages.push({ msg: 'User not found' })
    }
  } catch (e) {
    messages.push({
      msg: 'An error occured when sending confirmation email',
    })
  }
  return res
}

export const registerWithEmail = async (
  email: string,
  password: string
): Promise<AuthServiceResonse> => {
  const res: AuthServiceResonse = {
    errors: [],
    messages: [],
  }
  const { errors, messages } = res
  const foundUser = await authRepository.findUser(email)
  if (foundUser) {
    logger.error(`User already registered with email ${email}`)
    errors.push({
      msg: `User already registered`,
    })
  } else {
    try {
      const newUser = await authRepository.createUser(email, password)
      if (newUser && newUser.id) {
        const isConfirmationEmailSent = await sendConfirmationMail(newUser)
        if (isConfirmationEmailSent) {
          messages.push({ msg: 'Check your email to confirm your account!' })
        } else {
          authRepository.deleteUser(newUser.id)
          errors.push({
            msg: 'An error occurred while sending confirmation email',
          })
        }
      } else {
        errors.push({
          msg: 'An error occurred while sending confirmation email',
        })
      }
    } catch (e) {
      errors.push({
        msg: 'An error occurred while sending confirmation email',
      })
    }
  }
  return res
}

export const findUserWithConfirmationToken = async (
  confirmationToken: string
): Promise<FindUserWithConfirmationToken> => {
  const res: FindUserWithConfirmationToken = {
    errors: [],
    message: {
      token: '',
    },
  }
  const { errors, message } = res
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
        errors.push({ msg: 'Server error' })
        logger.error(e)
      }
      const token = jwt.signToken(user)
      message.token = token
    } else {
      await authRepository.deleteUser(user._id.toString())
      errors.push({ msg: 'Your account is expired, please re-register again' })
    }
  } else {
    errors.push({ msg: 'No new user found with that token' })
  }
  return res
}

export const sendConfirmationMail = async (
  user: UserEntityInput
): Promise<boolean> => {
  if (user?.local?.email && user.confirmationToken) {
    try {
      await mail.sendConfirmationMail(user.local.email, user.confirmationToken)
      return true
    } catch (e) {
      return false
    }
  }
  return false
}
