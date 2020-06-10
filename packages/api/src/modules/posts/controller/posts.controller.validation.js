const { query, check } = require("express-validator");

exports.validateFindNotes = [
  query("email").isEmail().normalizeEmail(),
  query("page").isNumeric(),
  query("limit").isNumeric(),
];
