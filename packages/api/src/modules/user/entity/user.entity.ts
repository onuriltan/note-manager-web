import { Document, Schema, model } from 'mongoose'

export interface LocalDoc {
  email: string
  password: string
}

export interface UserDoc extends Document {
  method: string
  local?: LocalDoc
  google?: LocalDoc
  facebook?: LocalDoc
  active: boolean
  confirmationToken?: string
  confirmationTokenExpiry?: Date
  password?: string
  date: Date
}

const UserSchema = new Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    required: true,
  },
  local: {
    email: {
      type: String,
      lowercase: true,
    },
    password: {
      type: String,
    },
  },
  google: {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
  },
  facebook: {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
  },
  active: {
    type: Boolean,
    default: false,
  },
  confirmationToken: {
    type: String,
  },
  confirmationTokenExpiry: {
    type: Date,
    default: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // until tomorrow
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date(),
  },
})
export default model<UserDoc>('User', UserSchema)
