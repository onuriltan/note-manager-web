const AuthValidation = require('../validation/auth')
const AuthDbService = require('../repository/auth')
const bcrypt = require('bcrypt')
const JwtOperations = require('../../../middlewares/jwt')
const MailOperations = require('../../../config/mail')

exports.loginWithEmail = async (req, res) => {
  const { email, password } = req.body
  const fieldErrors = AuthValidation.validateLogin(req.body)
  const isValid = fieldErrors.email === '' && fieldErrors.password === ''
  const errors = []

  if (!isValid) {
    res.status(400).json({ fieldErrors })
  } else {
    const user = await AuthDbService.findUser(email)
    if (user) {
      const isPasswordCorrect = bcrypt.compareSync(
        password,
        user.local.password
      )
      if (!user.active) {
        errors.push({ msg: 'You need to activate your account' })
        res.status(401).json({ errors })
      } else if (user.active && isPasswordCorrect) {
        const token = await JwtOperations.signToken(
          user,
          process.env.JWT_SECRET
        )
        res.json({ token, method: user.method })
      } else {
        errors.push({ msg: 'Username or password is wrong' })
        res.status(401).json({ errors })
      }
    } else {
      errors.push({ msg: 'Username or password is wrong' })
      res.status(401).json({ errors })
    }
  }
}

exports.registerWithEmail = async (req, res) => {
  const { email, password } = req.body
  const errors = []
  const messages = []
  const fieldErrors = AuthValidation.validateRegister(req.body) // Check required fields
  const isValid =
    fieldErrors.email === '' &&
    fieldErrors.password === '' &&
    fieldErrors.password2 === ''
  if (!isValid) {
    res.status(400).json({ fieldErrors })
  } else {
    const foundUser = await AuthDbService.findUser(email, password)
    if (!foundUser) {
      const newUser = await AuthDbService.createUser(email, password)
      if (newUser) {
        MailOperations.sendConfirmationMail(
          newUser.local.email,
          newUser.confirmationToken
        )
          .then((response) => {
            messages.push({ msg: 'Check your email to confirm your account!' })
            res.status(200).json({ messages })
          })
          .catch((err) => {
            errors.push({ msg: 'An error occurred while sending e-mail.' })
            res.status(400).json({ errors })
            throw new Error(err)
          })
      } else {
        await AuthDbService.deleteUser(newUser.id)
        errors.push({ msg: 'An error occurred' })
        res.status(400).json({ messages })
      }
    } else {
      errors.push({ msg: 'This email is already registered' })
      res.status(400).json({ errors })
    }
  }
}

exports.resendConfirmationEmail = async (req, res) => {
  const { email, password } = req.body
  const errors = []
  const messages = []
  const fieldErrors = AuthValidation.validateRegister(req.body) // Check required fields
  const isValid =
    fieldErrors.email === '' &&
    fieldErrors.password === '' &&
    fieldErrors.password2 === ''
  if (!isValid) {
    res.status(400).json({ fieldErrors })
  } else {
    const foundUser = await AuthDbService.findUser(email)
    if (foundUser && !foundUser.active) {
      const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password)
      if (isPasswordCorrect) {
        const user = await AuthDbService.regenerateUserConfirmationToken(email)
        if (user) {
          MailOperations.sendConfirmationMail(
            user.email,
            user.confirmationToken
          )
            .then(() => {
              messages.push({ msg: 'Confirmation email is resent!' })
              res.status(200).json({ messages })
            })
            .catch(() => {
              errors.push({ msg: 'An error occurred while sending e-mail.' })
              res.status(400).json({ errors })
            })
        }
      } else {
        errors.push({ msg: 'Username or password is wrong' })
        res.status(400).json({ errors })
      }
    } else {
      errors.push({ msg: 'An error occurred' })
      res.status(400).json({ errors })
    }
  }
}

exports.findUserWithConfirmationToken = async (req, res) => {
  const errors = []
  const confirmationToken = req.params.confirmationToken
  const user = await AuthDbService.findUserWithConfirmationToken(
    confirmationToken
  )
  if (user) {
    const expiry = user.confirmationTokenExpiry
    const compare = new Date().setDate(new Date().getDate() + 3)
    if (expiry < compare) {
      user.confirmationToken = undefined
      user.confirmationTokenExpiry = undefined
      user.active = true
      user.save((err, updatedUser) => {
        if (err) console.log(err)
        else console.log(updatedUser.name + ' activated')
      })
      const token = await JwtOperations.signToken(user)
      res.json({ token })
    } else {
      await AuthDbService.deleteUser(user.id)
      errors.push({ msg: 'Your account is expired, please re-register' })
      res.status(401).json({ errors })
    }
  } else {
    errors.push({ msg: 'No new user found with that token' })
    res.status(404).json({ errors })
  }
}
