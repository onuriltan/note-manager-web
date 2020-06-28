const express = require('express')
const router = express.Router()
const jwtConfig = require('@middleware/jwt')
const {
  validateFindNotes,
  validateFindNotesBetweenDatesandKeyword,
  validateCreateNote,
  validateDeleteNote,
  validateEditNote,
  returnValidationErrors,
} = require('./validator')

const {
  findNotes,
  findNotesBetweenDatesandKeyword,
  createNote,
  editNote,
  deleteNote,
} = require('./controller/note.controller')

// Middlewares
router.use(jwtConfig.verifyToken)
router.use(jwtConfig.decodeToken)

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

module.exports = router
