const { query, param, body } = require("express-validator");

exports.validateFindNotes = [
  query("email").isEmail().normalizeEmail(),
  query("page").isNumeric(),
  query("limit").isNumeric(),
];

exports.validateFindNotesBetweenDatesandKeyword = [
  param("fromDate").isISO8601().toDate(),
  param("toDate").isISO8601().toDate(),
];

exports.validateCreatePost = [body("text").isEmpty()];
exports.validateEditPost = [body("text").isEmpty(), param("id").isMongoId()];
exports.validateDeletePost = [param("id").isMongoId()];
