const User = require('../entity/user')
const bcrypt = require('bcrypt')

const getUser = async (email) => {
  let theUser = null
  await User.findOne({ 'local.email': email }).then((user) => {
    theUser = user
  })
  return theUser
}

const changePassword = async (email, oldPassword, newPassword) => {
  let theUser = null
  await User.findOne({ 'local.email': email }).then((user) => {
    theUser = user
  })
  if (theUser != null) {
    const isPasswordCorrect = bcrypt.compareSync(
      oldPassword,
      theUser.local.password
    )
    if (isPasswordCorrect) {
      theUser.local.password = await hashPassword(newPassword)
      theUser.save()
      return true
    }
    return false
  }
  return theUser
}

async function hashPassword(password) {
  // better to make this method reusable through app
  const saltRounds = 10
  return await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err)
      resolve(hash)
    })
  })
}

module.exports.getUser = getUser
module.exports.changePassword = changePassword
