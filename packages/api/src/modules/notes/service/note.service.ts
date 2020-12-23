import { NoteDoc } from '../entity/note.entity'
import * as notesRepository from '../repository/note.repository'
import { PaginateResult } from 'mongoose'

export const findNotes = async (
  email: string,
  pageAndLimit: {
    limit: number
    page: number
  }
): Promise<PaginateResult<NoteDoc> | boolean> => {
  const pageLimitAndSort = { ...pageAndLimit, sort: { date: -1 } }
  const notes = await notesRepository.findNotes(email, pageLimitAndSort)
  return notes
}
