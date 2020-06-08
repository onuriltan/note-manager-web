const jwtConfig = require("../../../middlewares/jwt");
const postsRepository = require("../repository/posts.repository");
const express = require("express");
const router = express.Router();

/*export const findNotes = (token) => {
  const authData = jwtConfig.isTokenValid(token);
  const notes = await postsRepository.findNotes(email, options);
  return notes;
};*/

router.use(jwtConfig.verifyToken);
router.use(jwtConfig.decodeToken);

router.get("/", async (req, res) => {
  const { email } = req;
  const { page, perPage } = req.query;
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
  };
  const notes = await postsRepository.findNotes(email, options);
  res.send(notes);
});

router.get("/:fromDate/:toDate/:keyword", async (req, res) => {
  const { page, perPage } = req.query;
  const { email } = req;
  const fromDate = new Date(req.params.fromDate);
  const toDate = new Date(req.params.toDate);
  const keyword = req.params.keyword;
  toDate.setDate(toDate.getDate() + 1);
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
  };

  const notes = await postsRepository.findNotesBetweenDatesandKeyword(
    fromDate,
    toDate,
    keyword,
    email,
    options
  );
  res.send(notes);
});

router.post("/", jwtConfig.verifyToken, async (req, res) => {
  const { email } = req;
  const { text } = req.body;
  const newPost = await postsRepository.createPost(text, email, res);
  res.status(201).send(newPost);
});

router.put("/:id", jwtConfig.verifyToken, async (req, res) => {
  const { email } = req;
  const { text } = req.body;
  const id = req.params.id;
  const updatedPost = await postsRepository.editPost(id, email, text);
  res.send(updatedPost);
});

router.delete("/:id", jwtConfig.verifyToken, async (req, res) => {
  const { email } = req;
  const id = req.params.id;
  const isUpdated = await postsRepository.deletePost(email, id);
  isUpdated ? res.status(201).send() : res.status(400).send();
});

module.exports = router;
