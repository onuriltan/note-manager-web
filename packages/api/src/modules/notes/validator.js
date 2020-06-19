const { query, param, body, validationResult } = require('express-validator')

exports.validateFindNotes = [
  query('email').isEmail(),
  query('page').isInt().toInt(),
  query('limit').isInt().toInt(),
]

exports.validateFindNotesBetweenDatesandKeyword = [
  param('fromDate').isISO8601().toDate(),
  param('toDate').isISO8601().toDate(),
  query('page').isInt().toInt(),
  query('limit').isInt().toInt(),
]

exports.validateCreateNote = [body('text').notEmpty()]
exports.validateEditNote = [body('text').notEmpty(), param('id').isMongoId()]
exports.validateDeleteNote = [param('id').isMongoId()]

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
