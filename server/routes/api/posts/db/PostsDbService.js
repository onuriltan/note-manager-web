const Post = require('../entity/Post');
const mongodb = require('mongodb');

const createPost = async (text, email) => {
    const newPost = new Post({
        text,
        email
    });
    await newPost.save().then(() => {
        return newPost;
    });
};

const findNotes = async (email, options) => {
    return await Post.paginate({email}, options);
};

const findNotesBetweenDatesandKeyword = async (fromDate, toDate, keyword, email, options) => {
    let regex = new RegExp(`${keyword}`, "i");

    if (fromDate.toString() === 'Invalid Date' && toDate.toString() === 'Invalid Date') {
        return await Post.paginate({email, text: {$regex: regex}}, options);

    } else if (fromDate.toString() === 'Invalid Date' && toDate.toString() !== 'Invalid Date') {
        return await Post.paginate({email, text: {$regex: regex}, createdAt: {$lte: toDate}}, options);

    } else if (fromDate.toString() !== 'Invalid Date' && toDate.toString() === 'Invalid Date') {
        return await Post.paginate({email, text: {$regex: regex}, createdAt: {$gte: fromDate}}, options);

    } else {
        return await Post.paginate({email, text: {$regex: regex}, createdAt: {$gte: fromDate, $lte: toDate}}, options);
    }

};

const editPost = async (id, email, text) => {
    await Post.findOneAndUpdate({_id: id, email: email}, {text: text, editedAt: new Date()}, (err, updatedPost) => {
        if (err) console.log(err);
        return updatedPost
    });
};

const deletePost = async (email, id) => {
    let isUpdated = false;
    await Post.deleteOne({_id: new mongodb.ObjectID(id), email: email})
        .then(() => {// in mongo id is a special type of ObjectID
            isUpdated = true;
        });
    return isUpdated;
};

module.exports.createPost = createPost;
module.exports.deletePost = deletePost;
module.exports.findNotes = findNotes;
module.exports.findNotesBetweenDatesandKeyword = findNotesBetweenDatesandKeyword;
module.exports.editPost = editPost;
