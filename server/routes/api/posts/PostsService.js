const express = require('express');
const JwtOperations = require('../../../config/JwtOperations');
const PostsDbService = require("./db/PostsDbService");
const router = express.Router();

router.get('/', JwtOperations.verifyToken, (req, res) => {
    const authData = JwtOperations.decodeToken(req, res);
    if (typeof authData !== "undefined") {
        const {user: {email}} = authData;
        PostsDbService.findPost(email, res);
    }
});

router.get('/:fromDate/:toDate/:keyword', JwtOperations.verifyToken, (req, res) => {
    const authData = JwtOperations.decodeToken(req, res);
    if (typeof authData !== "undefined") {
        const {user: {email}} = authData;
        const fromDate = new Date(req.params.fromDate);
        const toDate = new Date(req.params.toDate);
        const keyword = req.params.keyword;
        toDate.setDate(toDate.getDate()+1);

        PostsDbService.findPostBetweenDatesandKeyword(fromDate, toDate, keyword, email, res);
    }
});

router.post('/', JwtOperations.verifyToken, (req, res) => {
    const authData = JwtOperations.decodeToken(req, res);
    if (typeof authData !== "undefined") {
        const {user: {email}} = authData;
        const {text} = req.body;
        PostsDbService.createPost(text, email, res)
    }
});

router.put('/:id', JwtOperations.verifyToken, (req, res) => {
    const authData = JwtOperations.decodeToken(req, res);
    if (typeof authData !== "undefined") {
        const {user: {email}} = authData;
        const {text} = req.body;
        const id = req.params.id;
        PostsDbService.editPost(id, email, text, res);
    }
});

router.delete('/:id', JwtOperations.verifyToken, (req, res) => {
    const authData = JwtOperations.decodeToken(req, res);
    if (typeof authData !== "undefined") {
        const {user: {email}} = authData;
        const id = req.params.id;
        PostsDbService.deletePost(email, id, res);
    }

});


module.exports = router;


