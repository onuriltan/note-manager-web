/* eslint-disable @typescript-eslint/no-explicit-any */

import { query, param, body, validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export const validateFindNotes = [
  query('email').isEmail(),
  query('page').isInt().toInt(),
  query('limit').isInt().toInt(),
]

export const validateFindNotesBetweenDatesandKeyword = [
  param('fromDate').isISO8601().toDate(),
  param('toDate').isISO8601().toDate(),
  query('page').isInt().toInt(),
  query('limit').isInt().toInt(),
]

export const validateCreateNote = [body('text').notEmpty()]
export const validateEditNote = [
  body('text').notEmpty(),
  param('id').isMongoId(),
]
export const validateDeleteNote = [param('id').isMongoId()]

export const returnValidationErrors = function (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response<any> {
  const validationErrors = validationResult(req)
  const errors = {} as any // instead of sending errors as arrays, send object with keys, easier search
  validationErrors.array().forEach((error) => {
    errors[error.param] = error.msg
  })
  if (!validationErrors.isEmpty()) {
    return res.status(422).json({ fieldErrors: errors })
  }
  next()
}
