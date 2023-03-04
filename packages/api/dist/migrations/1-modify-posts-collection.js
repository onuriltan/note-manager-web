"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyPostsSchema = void 0;
const modifyPostsSchema = (migrator) => {
    migrator.add({
        version: 1,
        name: 'Change schema name from posts to notes',
        up: (db) => {
            db.collection('posts').rename('notes');
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        down() { },
    });
};
exports.modifyPostsSchema = modifyPostsSchema;
