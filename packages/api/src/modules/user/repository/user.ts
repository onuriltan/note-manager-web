import UserModel, { UserEntityInput } from '../entity/user.entity'
import bcrypt from 'bcrypt'
import { logger } from '../../../config/pino'

export const getUser = async (
  email: string
): Promise<UserEntityInput | null> => {
  return await UserModel.findOne({ 'local.email': email })
}

export const changePassword = async (
  email: string,
  oldPassword: string,
  newPassword: string
): Promise<boolean> => {
  const theUser = await UserModel.findOne({ 'local.email': email })
  if (theUser && theUser.local && theUser.local.password) {
    const isPasswordCorrect = bcrypt.compareSync(
      oldPassword,
      theUser.local.password
    )
    if (isPasswordCorrect) {
      let hashedPassword: unknown | string
      try {
        hashedPassword = await hashPassword(newPassword)
        if (typeof hashedPassword === 'string') {
          theUser.local.password = hashedPassword
        } else {
          logger.error(`Cannot hash password for user ${theUser.local.email} `)
          return false
        }
      } catch (e) {
        logger.error(`Cannot hash password for user ${theUser.local.email} `)
        return false
      }
      theUser.save()
      return true
    } else {
      logger.warn(
        `User ${theUser.local.email} tries to change password but enters wrong current password`
      )
      return false
    }
  } else {
    return false
  }
}

async function hashPassword(password: string) {
  // better to make this method reusable through app
  const saltRounds = 10
  return await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err)
      resolve(hash)
    })
  })
}
