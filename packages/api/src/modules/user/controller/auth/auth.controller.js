const bcrypt = require('bcrypt')
const authRepository = require('../../repository/auth')
const authService = require('../../service/auth/auth.service')
const jwt = require('@middleware/jwt')
const { logger } = require('@config/pino')

exports.loginWithSocial = async (req, res) => {
  if (req.user) {
    const token = await jwt.signToken(req.user)
    res.json({ token, method: req.user.method })
  } else {
    res.status(401)
  }
}

exports.loginWithEmail = async (req, res) => {
  const { email, password } = req.body
  const errors = []
  const user = await authRepository.findUser(email)
  if (user) {
    const isPasswordCorrect = bcrypt.compareSync(password, user.local.password)
    if (!user.active) {
      errors.push({ msg: 'You need to activate your account' })
      res.status(401).json({ errors })
    } else if (user.active && isPasswordCorrect) {
      const token = await jwt.signToken(user, process.env.JWT_SECRET)
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

exports.registerWithEmail = async (req, res) => {
  const { email, password } = req.body
  const errors = []
  const messages = []
  const foundUser = await authRepository.findUser(email, password)
  if (!foundUser) {
    const newUser = await authRepository.createUser(email, password)
    if (newUser) {
      const isConfirmationEmailSent = authService.sendConfirmationMail(newUser)
      if (isConfirmationEmailSent) {
        messages.push({ msg: 'Check your email to confirm your account!' })
        res.status(200).json({ messages })
      } else {
        errors.push({ msg: 'An error occurred, please try again' })
        res.status(400).json({ errors })
      }
    } else {
      await authRepository.deleteUser(newUser.id)
      errors.push({ msg: 'An error occurred' })
      res.status(400).json({ messages })
    }
  } else {
    errors.push({ msg: 'This email is already registered' })
    res.status(400).json({ errors })
  }
}

exports.resendConfirmationEmail = async (req, res) => {
  const { email, password } = req.body
  const errors = []
  const messages = []
  const foundUser = await authRepository.findUser(email)
  if (foundUser && !foundUser.active) {
    const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password)
    if (isPasswordCorrect) {
      const user = await authRepository.regenerateUserConfirmationToken(email)
      if (user) {
        const isConfirmationEmailSent = authService.sendConfirmationMail(user)
        if (isConfirmationEmailSent) {
          messages.push({ msg: 'Confirmation email is resent!' })
          res.status(200).json({ messages })
        } else {
          errors.push({ msg: 'An error occurred, please try again' })
          res.status(400).json({ errors })
        }
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

exports.findUserWithConfirmationToken = async (req, res) => {
  const errors = []
  const confirmationToken = req.params.confirmationToken
  const user = await authRepository.findUserWithConfirmationToken(
    confirmationToken
  )
  if (user) {
    const expiry = user.confirmationTokenExpiry
    const compare = new Date().setDate(new Date().getDate() + 3)
    if (expiry < compare) {
      user.confirmationToken = undefined
      user.confirmationTokenExpiry = undefined
      user.active = true
      try {
        const updatedUser = await user.save()
        logger.info(
          `User is activated by confirmation token: ${updatedUser.local.email}`
        )
      } catch (e) {
        logger.error(e)
      }
      const token = await jwt.signToken(user)
      res.json({ token })
    } else {
      await authRepository.deleteUser(user.id)
      errors.push({ msg: 'Your account is expired, please re-register again' })
      res.status(401).json({ errors })
    }
  } else {
    errors.push({ msg: 'No new user found with that token' })
    res.status(404).json({ errors })
  }
}
