const Post = require('../database/schema').Post;

module.exports = watchPosts;

function watchPosts(io) {
  Post.changes().then((feed) =>
    feed.each((error, doc) => {
      if (error) {
        console.error(error);
      }

      if (!doc.isSaved()) {
        io.emit('post-deleted', stringify(doc));
      } else if (!doc.getOldValue()) {
        io.emit('post-created', stringify(doc));
      } else {
        io.emit('post-updated', stringify(doc));
      }
    })
  ).catch((err) => {
    console.error(err);
  });
}

function stringify(doc) {
  return JSON.stringify(doc, null, 2);
}
