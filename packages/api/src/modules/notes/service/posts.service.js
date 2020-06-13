const postsRepository = require('../repository/posts.repository')

exports.findNotes = async (email, pageAndLimit) => {
  pageAndLimit.sort = { date: -1 }
  const notes = await postsRepository.findNotes(email, pageAndLimit)
  return notes
}
