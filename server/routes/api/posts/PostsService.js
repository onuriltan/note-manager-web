const express = require('express');
const JwtOperations = require('../../../config/JwtOperations');
const PostsDbService = require("./db/PostsDbService");

const router = express.Router();

// Get Posts
router.get('/', JwtOperations.getToken, async (req, res) => {
    const {user: {email}} = JwtOperations.verifyToken(req, res);
    PostsDbService.findPost(email, res);

});

// Add Posts
router.post('/', JwtOperations.getToken, async (req, res) => {
    const {user: {email}} = JwtOperations.verifyToken(req, res);
    const {text} = req.body;
    PostsDbService.createPost(text, email, res)

});
// Delete Posts
router.delete('/:id', JwtOperations.getToken, async (req, res) => {
    const {user: {email}} = JwtOperations.verifyToken(req, res);
    PostsDbService.deletePost(email, req, res);
});


module.exports = router;


