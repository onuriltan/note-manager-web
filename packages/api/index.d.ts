declare namespace NodeJS {
  export interface ProcessEnv {
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
    MAIL_ADDRESS: string
    MAIL_PASSWORD: string
  }

  export interface Process {
    env: ProcessEnv
  }
}
