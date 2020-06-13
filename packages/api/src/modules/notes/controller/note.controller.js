const postsRepository = require('../repository/note.repository')
const postsService = require('../service/note.service')
const { validationResult } = require('express-validator')

exports.findNotes = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  const { email, limit, page } = req.query
  const notes = await postsService.findNotes(email, { limit, page })
  res.send(notes)
}

exports.findNotesBetweenDatesandKeyword = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  const { email, limit, page } = req.query
  const fromDate = req.params.fromDate
  const toDate = req.params.toDate
  const keyword = req.params.keyword

  const notes = await postsRepository.findNotesBetweenDatesandKeyword(
    fromDate,
    toDate,
    keyword,
    email,
    { page, limit }
  )
  res.send(notes)
}

exports.createNote = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  const { email } = req.query
  const { text } = req.body
  const newPost = await postsRepository.createNote(text, email)
  res.status(201).send(newPost)
}

exports.editNote = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  const { email } = req.query
  const { text } = req.body
  const id = req.params.id
  const updatedPost = await postsRepository.editNote(id, email, text)
  res.send(updatedPost)
}

exports.deleteNote = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  const { email } = req.query
  const id = req.params.id
  const isUpdated = await postsRepository.deleteNote(email, id)
  isUpdated ? res.status(201).send() : res.status(400).send()
}
