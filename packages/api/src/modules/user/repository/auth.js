const User = require('../entity/user')
const mongodb = require('mongodb')
const bcrypt = require('bcrypt')
const uniqid = require('uniqid')

exports.findUser = async (email) => {
  let theUser = null
  await User.findOne({ 'local.email': email }).then((user) => {
    theUser = user
  })
  return theUser
}

exports.findUserWithConfirmationToken = async (confirmationToken) => {
  let theUser = null
  await User.findOne({ confirmationToken }).then((user) => {
    theUser = user
  })
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
  // Hash password
  newUser.local.password = await hashPassword(newUser) // Set password to hashed
  newUser.confirmationToken = uniqid()
  await newUser
    .save() // save user
    .then(() => {
      theUser = newUser
    })
    .catch((err) => {
      console.log(err)
    })
  return theUser
}

exports.regenerateUserConfirmationToken = async (email) => {
  let theUser = ''
  await User.findOne({ 'local.email': email }).then((user) => {
    theUser = user
  })
  theUser.confirmationToken = uniqid()
  await theUser
    .save() // save user
    .then((user) => {
      theUser = user
    })
    .catch((err) => {
      console.log(err)
    })
  return theUser
}

exports.deleteUser = async (id) => {
  let isDeleted = null
  await User.deleteOne({ _id: new mongodb.ObjectID(id) })
    .then(() => (isDeleted = true))
    .catch(() => (isDeleted = false))
  return isDeleted
}

async function hashPassword(user) {
  const password = user.local.password
  const saltRounds = 10
  return await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err)
      resolve(hash)
    })
  })
}
