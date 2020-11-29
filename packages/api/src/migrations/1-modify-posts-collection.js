exports.modifyPostsSchema = (migrator) => {
  migrator.add({
    version: 1,
    name: 'Change schema name from posts to notes',
    up: (db) => {
      db.collection('posts').rename('notes')
    },
    down() {},
  })
}
