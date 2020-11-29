const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const Noteschema = new mongoose.Schema({
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
Noteschema.plugin(mongoosePaginate)
const Note = mongoose.model('Note', Noteschema)
module.exports = Note
