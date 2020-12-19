declare global {
  namespace NodeJS {
    interface ProcessEnv {
      LOG_LEVEL: string
      MONGO_URL: string
      CLIENT_URL: string
      CONFIRM_EMAIL_URL: string
      FACEBOOK_APP_ID: string
      FACEBOOK_APP_SECRET: string
      FACEBOOK_APP_CALLBACK_URL: string
      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
      GOOGLE_CLIENT_CALLBACK_URL: string
      JWT_SECRET: string
      MAIL: string
      MAIL_PASSWORD: string
      MAIL_USERNAME: string
      PORT: string
    }
  }
  namespace Express {
    interface Request {
      token?: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
