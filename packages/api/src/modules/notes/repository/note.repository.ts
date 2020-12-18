import NoteEntity from '../entity/note.entity'
import { logger } from '../../../config/pino'

export const findNotes = async (email, options) => {
  const extendedOptions = { ...options, lean: true }
  try {
    return await NoteEntity.paginate({ email }, extendedOptions)
  } catch (e) {
    logger.error(e.toString())
    return false
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
  const query = {
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
    return false
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
    return false
  }
}

export const editNote = async (id, email, text) => {
  try {
    return await NoteEntity.findOneAndUpdate(
      { _id: id, email: email },
      { text: text }
    )
  } catch (e) {
    logger.error(e.toString())
    return false
  }
}

export const deleteNote = async (email, id) => {
  try {
    const deletedNote = await NoteEntity.deleteOne({
      _id: id,
      email,
    })
    return !!deletedNote
  } catch (e) {
    logger.error(e.toString())
    return false
  }
}
