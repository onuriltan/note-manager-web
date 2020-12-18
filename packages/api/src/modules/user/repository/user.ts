import User from '../entity/user.entity'
import bcrypt from 'bcrypt'

export const getUser = async (email) => {
  return await User.findOne({ 'local.email': email })
}

export const changePassword = async (email, oldPassword, newPassword) => {
  let theUser = await User.findOne({ 'local.email': email })
  if (theUser != null) {
    const isPasswordCorrect = bcrypt.compareSync(
      oldPassword,
      // @ts-ignore
      theUser.local.password
    )
    if (isPasswordCorrect) {
      // @ts-ignore
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
