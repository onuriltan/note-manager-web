import * as notesRepository from '../repository/note.repository'

export const findNotes = async (email, pageAndLimit) => {
  const pageLimitAndSort = { ...pageAndLimit, sort: { date: -1 } }
  const notes = await notesRepository.findNotes(email, pageLimitAndSort)
  return notes
}
