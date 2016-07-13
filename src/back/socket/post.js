const Post = require('../database/schema').Post;

module.exports = watchPosts;

function watchPosts(io) {
  Post.changes().then((feed) =>
    feed.each((error, doc) => {
      if (error) {
        console.error(error);
      }

      if (!doc.isSaved()) {
        io.emit('post-deleted', doc);
      } else if (!doc.getOldValue()) {
        io.emit('post-created', doc);
      } else {
        io.emit('post-updated', doc);
      }
    })
  ).catch((err) => {
    console.error(err);
  });
}
