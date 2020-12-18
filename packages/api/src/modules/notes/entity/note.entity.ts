import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

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
export default mongoose.model('Note', Noteschema)
