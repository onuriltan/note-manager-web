const UserDbService = require('../repository/user')
const UserValidation = require('../validation/user')
const JwtOperations = require('../../../middlewares/jwt')
const _ = require('lodash')

exports.getUser = async (req, res) => {
  const authData = JwtOperations.decodeToken(req, res)
  if (typeof authData !== 'undefined') {
    const {
      user: { email },
    } = authData
    const userProfile = await UserDbService.getUser(email)
    if (userProfile !== null) {
      res.send(userProfile)
    } else {
      res.status(404).send()
    }
  } else {
    res.status(401).send()
  }
}

exports.changePassword = async (req, res) => {
  const authData = JwtOperations.decodeToken(req, res)
  const {
    user: { email },
  } = authData
  const { oldPassword, newPassword } = req.body
  const fieldErrors = UserValidation.validateChangePassword(req.body)
  if (!_.isEmpty(fieldErrors)) {
    res.status(400).json({ fieldErrors })
  } else {
    const isPasswordChanged = await UserDbService.changePassword(
      email,
      oldPassword,
      newPassword
    )
    if (isPasswordChanged) {
      res.status(200).send()
    } else {
      res.status(400).json({
        fieldErrors: {
          oldPassword: 'Password is wrong',
          newPassword: '',
        },
      })
    }
  }
}
