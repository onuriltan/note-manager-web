import UserModel, { UserEntityInput, UserDoc } from '../entity/user.entity'
import mongodb from 'mongodb'
import bcrypt from 'bcrypt'
import uniqid from 'uniqid'
import { logger } from '../../../config/pino'

export const findUser = async (
  email: string
): Promise<UserEntityInput | null> => {
  try {
    return await UserModel.findOne({ 'local.email': email })
  } catch (e) {
    logger.error('An error occured  while finding user with email', e)
    return null
  }
}

export const findUserWithConfirmationToken = async (
  confirmationToken: string
): Promise<UserDoc | null> => {
  try {
    return await UserModel.findOne({ confirmationToken })
  } catch (e) {
    logger.error(
      'An error occured  while finding user with confirmationToken',
      e
    )
    return null
  }
}

export const createUser = async (
  email: string,
  password: string
): Promise<UserDoc | null> => {
  const newUser = new UserModel({
    method: 'local',
    local: {
      email: email,
      password: password,
    },
  })
  try {
    const hashedPwd = await hashPassword(newUser)
    if (hashedPwd && newUser && newUser.local && newUser.local.password) {
      newUser.local.password = hashedPwd
      newUser.confirmationToken = uniqid()
      return await newUser.save()
    } else {
      logger.error(`An error occured while hashing the password`)
      return null
    }
  } catch (e) {
    logger.error(`An error occured while createUser`, e)
    return null
  }
}

export const regenerateUserConfirmationToken = async (
  email: string
): Promise<UserEntityInput | null> => {
  try {
    const theUser = await UserModel.findOne({ 'local.email': email })
    if (theUser) {
      theUser.confirmationToken = uniqid()
      return await theUser.save()
    } else {
      logger.error(`No user with email ${email} is found`)
      return null
    }
  } catch (e) {
    logger.error(`An error occured while regenerateUserConfirmationToken`, e)
    return null
  }
}

export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    await UserModel.deleteOne({ _id: new mongodb.ObjectID(id) })
    return true
  } catch (e) {
    logger.error(`An error occured while deleting user with id ${id}`)
    if (e instanceof Error) {
      if (e instanceof Error) {
        logger.error(e)
      }
    }
    return false
  }
}

async function hashPassword(user: UserEntityInput) {
  const password = user?.local?.password
  const saltRounds = 10
  try {
    return await bcrypt.hash(password, saltRounds)
  } catch (e) {
    logger.error(`An error occured while hashPassword`, e)
    return null
  }
}
