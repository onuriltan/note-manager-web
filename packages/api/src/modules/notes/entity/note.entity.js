const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const PostSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  editedAt: {
    type: Date,
  },
})
PostSchema.plugin(mongoosePaginate)
const Post = mongoose.model('Post', PostSchema)
module.exports = Post
