const { migrator } = require('mgdb-migrator')
const { modifyPostsSchema } = require('./1-modify-posts-collection')
const { logger } = require('@config/pino')

export const configureAndRunMigrations = async () => {
  // Run migrations one by one
  try {
    logger.warn('Configuring migrator...')
    await migrator.config({
      log: true,
      logger: (level, ...args) => logger.info(...args),
      logIfLatest: true,
      collectionName: 'migrations',
      db: {
        connectionUrl: process.env.MONGO_URL,
        name: 'note-manager',
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      },
    })
    await modifyPostsSchema(migrator)
  } catch (e) {
    logger.error('Error when running migrations.')
    throw new Error(e)
  }

  migrator.migrateTo('latest')
}
