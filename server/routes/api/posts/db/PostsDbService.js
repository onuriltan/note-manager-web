const Post = require('../../../../models/Post');
const mongodb = require('mongodb');

const createPost = (text, email, res) => {
    const newPost = new Post({
        text,
        email
    });
    newPost.save().then(() => {
        res.status(201).send();
    });
};

const findPost = (email, res) => {
    Post.find({email}, (err, posts) => {
        res.send(posts);
    });
};

const deletePost = (email, req, res) => {
    Post.deleteOne({_id: new mongodb.ObjectID(req.params.id), email: email}).then(() => {// in mongo id is a special type of ObjectID
            res.status(200).send();
        }
    );
};

module.exports.createPost = createPost;
module.exports.deletePost = deletePost;
module.exports.findPost = findPost;
