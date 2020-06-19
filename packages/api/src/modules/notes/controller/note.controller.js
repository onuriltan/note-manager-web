const noteRepository = require('../repository/note.repository')
const noteService = require('../service/note.service')

exports.findNotes = async (req, res) => {
  const { email, limit, page } = req.query
  const notes = await noteService.findNotes(email, { limit, page })
  res.send(notes)
}

exports.findNotesBetweenDatesandKeyword = async (req, res) => {
  const { email, limit, page } = req.query
  const fromDate = req.params.fromDate
  const toDate = req.params.toDate
  const keyword = req.params.keyword

  const notes = await noteRepository.findNotesBetweenDatesandKeyword(
    fromDate,
    toDate,
    keyword,
    email,
    { page, limit }
  )
  res.send(notes)
}

exports.createNote = async (req, res) => {
  const { email } = req.query
  const { text } = req.body
  const newPost = await noteRepository.createNote(text, email)
  res.status(201).send(newPost)
}

exports.editNote = async (req, res) => {
  const { email } = req.query
  const { text } = req.body
  const id = req.params.id
  const updatedPost = await noteRepository.editNote(id, email, text)
  res.send(updatedPost)
}

exports.deleteNote = async (req, res) => {
  const { email } = req.query
  const id = req.params.id
  const isUpdated = await noteRepository.deleteNote(email, id)
  isUpdated ? res.status(201).send() : res.status(400).send()
}
