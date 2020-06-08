const express = require("express");
const jwtConfig = require("../../../utils/jwt");
const postsRepository = require("../repository/posts.repository");
const postsService = require("../service/posts.service");
const router = express.Router();

router.get("/", jwtConfig.verifyToken, async (req, res) => {
  const authData = jwtConfig.decodeToken(req, res);
  const { page, perPage } = req.query;
  if (typeof authData !== "undefined") {
    const { user } = authData;
    console.log(authData);
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
    const notes = await postsRepository.findNotes(email, options);
    res.send(notes);
  }
});

router.get(
  "/:fromDate/:toDate/:keyword",
  jwtConfig.verifyToken,
  async (req, res) => {
    const authData = jwtConfig.decodeToken(req, res);
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

      const notes = await postsRepository.findNotesBetweenDatesandKeyword(
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

router.post("/", jwtConfig.verifyToken, async (req, res) => {
  const authData = jwtConfig.decodeToken(req, res);
  if (typeof authData !== "undefined") {
    const { user } = authData;
    let email = getEmail(user);
    const { text } = req.body;
    const newPost = await postsRepository.createPost(text, email, res);
    res.status(201).send(newPost);
  }
});

router.put("/:id", jwtConfig.verifyToken, async (req, res) => {
  const authData = jwtConfig.decodeToken(req, res);
  if (typeof authData !== "undefined") {
    const { user } = authData;
    let email = getEmail(user);
    const { text } = req.body;
    const id = req.params.id;
    const updatedPost = await postsRepository.editPost(id, email, text);
    res.send(updatedPost);
  }
});

router.delete("/:id", jwtConfig.verifyToken, async (req, res) => {
  const authData = jwtConfig.decodeToken(req, res);
  if (typeof authData !== "undefined") {
    const { user } = authData;
    let email = getEmail(user);
    const id = req.params.id;
    const isUpdated = await postsRepository.deletePost(email, id);
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
