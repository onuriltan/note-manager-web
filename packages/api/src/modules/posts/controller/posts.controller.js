const postsRepository = require("../repository/posts.repository");
const postsService = require("../service/posts.service");
const { validationResult } = require("express-validator/check");

exports.findNotes = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { page, perPage, email } = req.query;
  const notes = await postsService.findNotes(email, { page, perPage });
  res.send(notes);
};

exports.findNotesBetweenDatesandKeyword = async (req, res) => {
  const { page, perPage, email } = req.query;
  const fromDate = new Date(req.params.fromDate);
  const toDate = new Date(req.params.toDate);
  const keyword = req.params.keyword;
  toDate.setDate(toDate.getDate() + 1);
  const pageAndLimit = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
  };

  const notes = await postsRepository.findNotesBetweenDatesandKeyword(
    fromDate,
    toDate,
    keyword,
    email,
    pageAndLimit
  );
  res.send(notes);
};

exports.createPost = async (req, res) => {
  const { email } = req.query;
  const { text } = req.body;
  const newPost = await postsRepository.createPost(text, email, res);
  res.status(201).send(newPost);
};

exports.editPost = async (req, res) => {
  const { email } = req.query;
  const { text } = req.body;
  const id = req.params.id;
  const updatedPost = await postsRepository.editPost(id, email, text);
  res.send(updatedPost);
};

exports.deletePost = async (req, res) => {
  const { email } = req.query;
  const id = req.params.id;
  const isUpdated = await postsRepository.deletePost(email, id);
  isUpdated ? res.status(201).send() : res.status(400).send();
};
