const express = require('express');
const mongodb = require('mongodb');
const JwtOperations = require('../../../config/JwtOperations');
const Post = require('../../../models/Post');

const router = express.Router();

// Get Posts
router.get('/', JwtOperations.getToken, async (req, res) => {
    const {user: {email}} = JwtOperations.verifyToken(req, res);
    Post.find({email}, (err, posts) => {
        res.send(posts);
    });
});

// Add Posts
router.post('/', JwtOperations.getToken, async (req, res) => {
    const {user: {email}} = JwtOperations.verifyToken(req, res);
    const {text} = req.body;
    console.log(email);
    const newPost = new Post({
        text,
        email
    });
    newPost.save().then((post) => {
        res.status(201).send();
    });

});
// Delete Posts
router.delete('/:id', JwtOperations.getToken, async (req, res) => {
    JwtOperations.verifyToken(req, res);
    Post.deleteOne({_id: new mongodb.ObjectID(req.params.id)}).then(() => {// in mongo id is a special type of ObjectID
            res.status(200).send();
        }
    );
});


module.exports = router;


