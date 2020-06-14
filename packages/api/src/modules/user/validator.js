const { check, validationResult } = require('express-validator')

exports.validateRegisterWithEmail = [
  check('email').notEmpty().withMessage('Email required.'),
  check('email').isEmail().withMessage('Email is not valid.'),
  check('password').notEmpty().withMessage('Password required.'),
  check('password2').notEmpty().withMessage('Repeat password required.'),
  check('password')
    .isLength({ min: 6, max: 20 })
    .withMessage('Password length should between 6 and 20'),
  check('password2')
    .isLength({ min: 6, max: 20 })
    .withMessage('Password length should between 6 and 20'),
  check('password2', 'Passwords does not match.')
    .exists()
    .custom((password2, { req }) => password2 === req.body.password),
]

exports.validateLoginWithEmail = [
  check('email').notEmpty().withMessage('Email required.'),
  check('email').isEmail().withMessage('Email is not valid.'),
  check('password').notEmpty().withMessage('Password required.'),
  check('password')
    .isLength({ min: 6, max: 20 })
    .withMessage('Password length should between 6 and 20'),
]

exports.returnValidationErrors = function (req, res, next) {
  const validationErrors = validationResult(req)
  const errors = {} // instead of sending errors as arrays, send object with keys, easier search
  validationErrors.array().forEach((error) => {
    errors[error.param] = error.msg
  })
  if (!validationErrors.isEmpty()) {
    return res.status(422).json({ fieldErrors: errors })
  }
  next()
}
