const express = require('express')
const router = express.Router()
const jwtConfig = require('../../middlewares/jwt')
const {
  validateFindNotes,
  validateFindNotesBetweenDatesandKeyword,
  validateCreateNote,
  validateDeleteNote,
  validateEditNote,
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

router.get('/', validateFindNotes, findNotes)
router.get(
  '/:fromDate/:toDate/:keyword',
  validateFindNotesBetweenDatesandKeyword,
  findNotesBetweenDatesandKeyword
)
router.post('/', validateCreateNote, createNote)
router.put('/:id', validateEditNote, editNote)
router.delete('/:id', validateDeleteNote, deleteNote)

module.exports = router
