import User from '../entity/user.entity'
import mongodb from 'mongodb'
import bcrypt from 'bcrypt'
import uniqid from 'uniqid'
import { logger } from '../../../config/pino'

export const findUser = async (email) => {
  try {
    return await User.findOne({ 'local.email': email })
  } catch (e) {
    logger.error('An error occured  while finding user with email', e)
    return null
  }
}

export const findUserWithConfirmationToken = async (confirmationToken) => {
  try {
    return await User.findOne({ confirmationToken })
  } catch (e) {
    logger.error(
      'An error occured  while finding user with confirmationToken',
      e
    )
    return null
  }
}

export const createUser = async (email, password) => {
  const newUser = new User({
    method: 'local',
    local: {
      email: email,
      password: password,
    },
  })
  try {
    const hashedPwd = await hashPassword(newUser)
    if (hashedPwd) {
      // @ts-ignore
      newUser.local.password = hashedPwd
      newUser.confirmationToken = uniqid()
      return await newUser.save()
    }
  } catch (e) {
    logger.error(`An error occured while createUser`, e)
    return null
  }
}

export const regenerateUserConfirmationToken = async (email) => {
  try {
    let theUser = await User.findOne({ 'local.email': email })
    if (theUser) {
      theUser.confirmationToken = uniqid()
      return await theUser.save()
    }
  } catch (e) {
    logger.error(`An error occured while regenerateUserConfirmationToken`, e)
    return null
  }
}

export const deleteUser = async (id) => {
  let isDeleted = false
  try {
    await User.deleteOne({ _id: new mongodb.ObjectID(id) })
    isDeleted = true
  } catch (e) {
    logger.error(`An error occured while deleteUser`, e)
  }
  return isDeleted
}

async function hashPassword(user) {
  const password = user.local.password
  const saltRounds = 10
  try {
    return await bcrypt.hash(password, saltRounds)
  } catch (e) {
    logger.error(`An error occured while hashPassword`, e)
    return null
  }
}
