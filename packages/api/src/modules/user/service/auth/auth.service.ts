import * as mail from '../../../../config/mail'
import { UserEntityInput } from '../../entity/user.entity'
import * as authRepository from '../../repository/auth'
import bcrypt from 'bcrypt'
import { logger } from '../../../../config/pino'

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

export const resendConfirmationMail = async (
  email: string,
  password: string
): Promise<boolean> => {
  try {
    const foundUser = await authRepository.findUser(email)
    if (foundUser && !foundUser.active && foundUser.password) {
      const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password)
      if (isPasswordCorrect) {
        const user = await authRepository.regenerateUserConfirmationToken(email)
        if (user) {
          return await sendConfirmationMail(user)
        } else {
          return false
        }
      } else {
        return false
      }
    } else {
      return false
    }
  } catch (e) {
    return false
  }
}

export const registerWithEmail = async (
  email: string,
  password: string
): Promise<boolean> => {
  const foundUser = await authRepository.findUser(email)
  if (foundUser) {
    logger.error(`User already registered with email ${email}`)
    return false
  } else {
    try {
      const newUser = await authRepository.createUser(email, password)
      if (newUser && newUser.id) {
        const isConfirmationEmailSent = await sendConfirmationMail(newUser)
        if (isConfirmationEmailSent) {
          return true
        } else {
          authRepository.deleteUser(newUser.id)
          return false
        }
      } else {
        logger.error(`An error occured while creating new user: ${email}`)
        return false
      }
    } catch (e) {
      return false
    }
  }
}
