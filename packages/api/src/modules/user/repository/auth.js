const User = require('../entity/user')
const mongodb = require('mongodb')
const bcrypt = require('bcrypt')
const uniqid = require('uniqid')
const { logger } = require('../../../config/pino')

exports.findUser = async (email) => {
  let theUser = null
  try {
    theUser = await User.findOne({ 'local.email': email })
  } catch (e) {
    logger.error('An error occured  while finding user with email', e)
  }
  return theUser
}

exports.findUserWithConfirmationToken = async (confirmationToken) => {
  let theUser = null
  try {
    theUser = await User.findOne({ confirmationToken })
  } catch (e) {
    logger.error(
      'An error occured  while finding user with confirmationToken',
      e
    )
  }
  return theUser
}

exports.createUser = async (email, password) => {
  let theUser = null
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
      newUser.local.password = hashedPwd
      newUser.confirmationToken = uniqid()
      theUser = await newUser.save()
    }
  } catch (e) {
    logger.error(`An error occured while createUser`, e)
  }
  return theUser
}

exports.regenerateUserConfirmationToken = async (email) => {
  let theUser = null
  try {
    theUser = await User.findOne({ 'local.email': email })
    theUser.confirmationToken = uniqid()
    theUser = await theUser.save()
  } catch (e) {
    logger.error(`An error occured while regenerateUserConfirmationToken`, e)
  }
  return theUser
}

exports.deleteUser = async (id) => {
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
  let hash = null
  try {
    hash = await bcrypt.hash(password, saltRounds)
  } catch (e) {
    logger.error(`An error occured while hashPassword`, e)
  }
  return hash
}
