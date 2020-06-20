const NoteEntity = require('../entity/note.entity')
const { logger } = require('../../../config/pino')

exports.findNotes = async (email, options) => {
  const extendedOptions = { ...options, lean: true }
  const result = []
  try {
    return await NoteEntity.paginate({ email }, extendedOptions)
  } catch (e) {
    logger.error(e.toString())
  }
  return result
}

exports.findNotesBetweenDatesandKeyword = async (
  fromDate,
  toDate,
  keyword,
  email,
  options
) => {
  const extendedOptions = { ...options, lean: true, sort: { date: -1 } }
  const regex = new RegExp(`${keyword}`, 'i')
  const query = {
    email,
    createdAt: {
      $gte: fromDate,
      $lt: toDate,
    },
  }
  if (keyword && keyword !== ' ') {
    query.text = { $regex: regex }
  }
  let result = []
  try {
    result = await NoteEntity.paginate(query, extendedOptions)
  } catch (e) {
    logger.error(e.toString())
  }
  return result
}

exports.createNote = async (text, email) => {
  let newNote = ''
  try {
    newNote = await new NoteEntity({
      text,
    }).save()
  } catch (e) {
    logger.error(e.toString())
  }
  return newNote
}

exports.editNote = async (id, email, text, editedAt) => {
  let editedNote = ''
  try {
    editedNote = await NoteEntity.findOneAndUpdate(
      { _id: id, email: email },
      { text: text, editedAt }
    )
  } catch (e) {
    logger.error(e.toString())
  }
  return editedNote
}

exports.deleteNote = async (email, id) => {
  let deletedNote = ''
  try {
    deletedNote = await NoteEntity.deleteOne({
      _id: id,
      email,
    })
  } catch (e) {
    logger.error(e.toString())
  }
  return !!deletedNote
}
