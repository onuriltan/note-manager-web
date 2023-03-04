"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureAndRunMigrations = void 0;
const mgdb_migrator_1 = require("mgdb-migrator");
const _1_modify_posts_collection_1 = require("./1-modify-posts-collection");
const pino_1 = require("../config/pino");
const configureAndRunMigrations = async () => {
    // Run migrations one by one
    try {
        pino_1.logger.warn('Configuring migrator...');
        await mgdb_migrator_1.migrator.config({
            log: true,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            logger: (level, ...args) => pino_1.logger.info(...args),
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
        });
        (0, _1_modify_posts_collection_1.modifyPostsSchema)(mgdb_migrator_1.migrator);
    }
    catch (e) {
        pino_1.logger.error('Error when running migrations.');
        if (e instanceof Error) {
            throw e;
        }
    }
    mgdb_migrator_1.migrator.migrateTo('latest');
};
exports.configureAndRunMigrations = configureAndRunMigrations;
