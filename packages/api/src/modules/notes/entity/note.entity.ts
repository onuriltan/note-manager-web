import { Document, Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'
export interface NoteDoc extends Document {
  text: string
  email: string
  createdAt: Date
  editedAt?: Date
}

const NoteSchema = new Schema({
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
NoteSchema.plugin(mongoosePaginate)
export default model<NoteDoc>('Note', NoteSchema)
