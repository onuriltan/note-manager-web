const express = require("express");
const router = express.Router();
const jwtConfig = require("../../middlewares/jwt");

const {
  validateFindNotes,
  validateFindNotesBetweenDatesandKeyword,
  validateCreatePost,
  validateEditPost,
  validateDeletePost,
} = require("./validator");

const {
  findNotes,
  findNotesBetweenDatesandKeyword,
  createPost,
  editPost,
  deletePost,
} = require("./controller/posts.controller");

router.use(jwtConfig.verifyToken);
router.use(jwtConfig.decodeToken);

router.get("/", validateFindNotes, findNotes);
router.get(
  "/:fromDate/:toDate/:keyword",
  validateFindNotesBetweenDatesandKeyword,
  findNotesBetweenDatesandKeyword
);
router.post("/", validateCreatePost, createPost);
router.put("/:id", validateEditPost, editPost);
router.delete("/:id", validateDeletePost, deletePost);

module.exports = router;
