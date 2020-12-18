import NoteEntity from '../entity/note.entity'
import { logger } from '../../../config/pino'

export const findNotes = async (email, options) => {
  const extendedOptions = { ...options, lean: true }
  try {
    return await NoteEntity.paginate({ email }, extendedOptions)
  } catch (e) {
    logger.error(e.toString())
  }
}

export const findNotesBetweenDatesandKeyword = async (
  fromDate,
  toDate,
  keyword,
  email,
  options
) => {
  const extendedOptions = { ...options, lean: true, sort: { date: -1 } }
  const regex = new RegExp(`${keyword}`, 'i')
  let query = {
    email,
    createdAt: {
      $gte: fromDate,
      $lt: toDate,
    },
    text: '',
  }
  if (keyword && keyword !== ' ') {
    query.text = { $regex: regex } as any
  }
  try {
    return await NoteEntity.paginate(query, extendedOptions)
  } catch (e) {
    logger.error(e.toString())
  }
}

export const createNote = async (text, email) => {
  try {
    return await new NoteEntity({
      text,
      email,
    }).save()
  } catch (e) {
    logger.error(e.toString())
  }
}

export const editNote = async (id, email, text, editedAt) => {
  let editedNote = ''
  try {
    return await NoteEntity.findOneAndUpdate(
      { _id: id, email: email },
      { text: text, editedAt }
    )
  } catch (e) {
    logger.error(e.toString())
  }
}

export const deleteNote = async (email, id) => {
  try {
    return await NoteEntity.deleteOne({
      _id: id,
      email,
    })
  } catch (e) {
    logger.error(e.toString())
  }
}
