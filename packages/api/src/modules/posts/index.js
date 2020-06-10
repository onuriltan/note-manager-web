const express = require("express");
const router = express.Router();
const jwtConfig = require("../../middlewares/jwt");
const validator = require("./controller/posts.controller.validation");
const postsController = require("./controller/posts.controller");

router.use(jwtConfig.verifyToken);
router.use(jwtConfig.decodeToken);

router.get("/", validator.validateFindNotes, postsController.findNotes);
router.get(
  "/:fromDate/:toDate/:keyword",
  postsController.findNotesBetweenDatesandKeyword
);
router.post("/", postsController.createPost);
router.put("/:id", postsController.editPost);
router.delete("/:id", postsController.editPost);

module.exports = router;
