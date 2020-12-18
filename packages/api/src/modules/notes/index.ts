import express from 'express'
import { verifyToken, decodeToken } from '../../middlewares/jwt'
import {
  validateFindNotes,
  validateFindNotesBetweenDatesandKeyword,
  validateCreateNote,
  validateDeleteNote,
  validateEditNote,
  returnValidationErrors,
} from './validator'

import {
  findNotes,
  findNotesBetweenDatesandKeyword,
  createNote,
  editNote,
  deleteNote,
} from './controller/note.controller'

const router = express.Router()

// Middlewares
router.use(verifyToken)
router.use(decodeToken)

router.get('/', validateFindNotes, returnValidationErrors, findNotes)
router.get(
  '/:fromDate/:toDate/:keyword',
  validateFindNotesBetweenDatesandKeyword,
  returnValidationErrors,
  findNotesBetweenDatesandKeyword
)
router.post('/', validateCreateNote, returnValidationErrors, createNote)
router.put('/:id', validateEditNote, returnValidationErrors, editNote)
router.delete('/:id', validateDeleteNote, returnValidationErrors, deleteNote)

export default router
