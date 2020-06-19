const postsRepository = require('../repository/note.repository')

exports.findNotes = async (email, pageAndLimit) => {
  const pageLimitAndSort = { ...pageAndLimit, sort: { date: -1 } }
  const notes = await postsRepository.findNotes(email, pageLimitAndSort)
  return notes
}
