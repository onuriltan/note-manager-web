import { Document, Schema, model } from 'mongoose'

export interface UserEntityInput {
  method: SignUpMethod
  active: boolean
  local?: LocalDoc
  google?: LocalDoc
  facebook?: LocalDoc
  confirmationToken?: string
  confirmationTokenExpiry?: Date
  password?: string
}

export enum SignUpMethod {
  LOCAL = 'local',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}
export interface LocalDoc {
  email: string
  password: string
}

export interface UserDoc extends Document, UserEntityInput {}

const UserSchema = new Schema(
  {
    method: {
      type: SignUpMethod,
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
  },
  { timestamps: true }
)
export default model<UserDoc>('User', UserSchema)
