const express = require("express");
const JwtOperations = require("../../../config/jwt");
const PostsRepository = require("../repository/posts");
const router = express.Router();

router.get("/", JwtOperations.verifyToken, async (req, res) => {
  const authData = JwtOperations.decodeToken(req, res);
  const { page, perPage } = req.query;
  if (typeof authData !== "undefined") {
    const { user } = authData;
    let email = null;
    if (user.method === "google") {
      email = user.google.email;
    } else if (user.method === "facebook") {
      email = user.facebook.email;
    } else if (user.method === "local") {
      email = user.local.email;
    }
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(perPage, 10) || 10,
    };
    const notes = await PostsRepository.findNotes(email, options);
    res.send(notes);
  }
});

router.get(
  "/:fromDate/:toDate/:keyword",
  JwtOperations.verifyToken,
  async (req, res) => {
    const authData = JwtOperations.decodeToken(req, res);
    const { page, perPage } = req.query;
    if (typeof authData !== "undefined") {
      const { user } = authData;
      let email = getEmail(user);
      const fromDate = new Date(req.params.fromDate);
      const toDate = new Date(req.params.toDate);
      const keyword = req.params.keyword;
      toDate.setDate(toDate.getDate() + 1);
      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 10,
      };

      const notes = await PostsRepository.findNotesBetweenDatesandKeyword(
        fromDate,
        toDate,
        keyword,
        email,
        options
      );
      res.send(notes);
    }
  }
);

router.post("/", JwtOperations.verifyToken, async (req, res) => {
  const authData = JwtOperations.decodeToken(req, res);
  if (typeof authData !== "undefined") {
    const { user } = authData;
    let email = getEmail(user);
    const { text } = req.body;
    const newPost = await PostsRepository.createPost(text, email, res);
    res.status(201).send(newPost);
  }
});

router.put("/:id", JwtOperations.verifyToken, async (req, res) => {
  const authData = JwtOperations.decodeToken(req, res);
  if (typeof authData !== "undefined") {
    const { user } = authData;
    let email = getEmail(user);
    const { text } = req.body;
    const id = req.params.id;
    const updatedPost = await PostsRepository.editPost(id, email, text);
    res.send(updatedPost);
  }
});

router.delete("/:id", JwtOperations.verifyToken, async (req, res) => {
  const authData = JwtOperations.decodeToken(req, res);
  if (typeof authData !== "undefined") {
    const { user } = authData;
    let email = getEmail(user);
    const id = req.params.id;
    const isUpdated = await PostsRepository.deletePost(email, id);
    isUpdated ? res.status(201).send() : res.status(400).send();
  }
});

function getEmail(user) {
  let email = null;
  if (user.method === "google") {
    email = user.google.email;
  } else if (user.method === "facebook") {
    email = user.facebook.email;
  } else if (user.method === "local") {
    email = user.local.email;
  }
  return email;
}

module.exports = router;
