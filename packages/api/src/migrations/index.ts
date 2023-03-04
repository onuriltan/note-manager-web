import { migrator } from 'mgdb-migrator'
import { modifyPostsSchema } from './1-modify-posts-collection'
import { logger } from '../config/pino'

export const configureAndRunMigrations = async (): Promise<void> => {
  // Run migrations one by one
  try {
    logger.warn('Configuring migrator...')
    await migrator.config({
      log: true,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      logger: (level, ...args) => logger.info(...args),
      logIfLatest: true,
      collectionName: 'migrations',
      db: {
        connectionUrl: process.env.MONGO_URL || '',
        name: 'note-manager',
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      },
    })
    modifyPostsSchema(migrator)
  } catch (e) {
    logger.error('Error when running migrations.')
    if (e instanceof Error) {
      throw e
    }
  }

  migrator.migrateTo('latest')
}
