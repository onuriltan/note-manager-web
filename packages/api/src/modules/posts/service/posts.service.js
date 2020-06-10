const postsRepository = require("../repository/posts.repository");

exports.findNotes = async (email, pageAndLimit) => {
  const notes = await postsRepository.findNotes(email, pageAndLimit);
  return notes;
};
