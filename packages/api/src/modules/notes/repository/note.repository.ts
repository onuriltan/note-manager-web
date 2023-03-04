import NoteEntity, { NoteDoc } from '../entity/note.entity'
import { logger } from '../../../config/pino'
import { PaginateOptions, PaginateResult } from 'mongoose'

export const findNotes = async (
  email: string,
  options: PaginateOptions
): Promise<PaginateResult<NoteDoc> | boolean> => {
  const extendedOptions = { ...options, lean: true }
  try {
    return await NoteEntity.paginate({ email }, extendedOptions)
  } catch (e) {
    if (e instanceof Error) {
      if (e instanceof Error) {
        logger.error(e)
      }
    }
    return false
  }
}

export const findNotesBetweenDatesandKeyword = async (
  fromDate: Date,
  toDate: Date,
  keyword: string,
  email: string,
  options: PaginateOptions
): Promise<PaginateResult<NoteDoc> | boolean> => {
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    query.text = { $regex: regex }
  }
  try {
    return await NoteEntity.paginate(query, extendedOptions)
  } catch (e) {
    if (e instanceof Error) {
      if (e instanceof Error) {
        logger.error(e)
      }
    }
    return false
  }
}

export const createNote = async (
  text: string,
  email: string
): Promise<NoteDoc | null> => {
  try {
    return await new NoteEntity({
      text,
      email,
    }).save()
  } catch (e) {
    if (e instanceof Error) {
      if (e instanceof Error) {
        logger.error(e)
      }
    }
    return null
  }
}

export const editNote = async (
  id: string,
  email: string,
  text: string
): Promise<NoteDoc | null> => {
  try {
    return await NoteEntity.findOneAndUpdate(
      { _id: id, email: email },
      { text: text }
    )
  } catch (e) {
    if (e instanceof Error) {
      if (e instanceof Error) {
        logger.error(e)
      }
    }
    return null
  }
}

export const deleteNote = async (
  email: string,
  id: string
): Promise<boolean> => {
  try {
    const deletedNote = await NoteEntity.deleteOne({
      _id: id,
      email,
    })
    return !!deletedNote
  } catch (e) {
    if (e instanceof Error) {
      if (e instanceof Error) {
        logger.error(e)
      }
    }
    return false
  }
}
