import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import mongoose from 'mongoose'
import helmet from 'helmet'
import { configurePassport } from './config/passport'
import { logger } from './config/pino'
import { configureAndRunMigrations } from './migrations'
import * as dotenv from 'dotenv'
import noteModule from './modules/notes'
import userModule from './modules/user'
require('module-alias/register')

const bootServer = async () => {
  // Environment Variables
  logger.info(
    'Loading env vars from ' +
      path.resolve(__dirname, '..', `.env.${process.env.NODE_ENV}`)
  )
  dotenv.config({
    path: path.resolve(__dirname, '..', `.env.${process.env.NODE_ENV}`),
  })

  // Middleware
  const server = express()
  server.use(bodyParser.json())
  server.use(cors())
  server.use(cookieParser())
  server.use(passport.initialize())
  server.use(helmet())

  // Connect to Mongo
  try {
    logger.warn('Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    logger.info('MongoDB connected.')
  } catch (e) {
    logger.error('MongoDB failed to connect.')
    if (e instanceof Error) {
      throw e
    }
  }

  // Run Mongo migrations
  await configureAndRunMigrations()
  configurePassport()

  // Routes
  server.use('/api/notes', noteModule)
  server.use('/api/user', userModule)

  const port = process.env.PORT || 5000

  server.listen(port)
}

bootServer()
  .then(() => {
    logger.info('Server is ready.')
  })
  .catch((e) => {
    logger.error('Server is failed to boot.')
    if (e instanceof Error) {
      logger.error(e)
    }
  })
