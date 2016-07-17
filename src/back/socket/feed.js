const Post    = require('../database/schema').Post;
const Like    = require('../database/schema').Like;
const Comment = require('../database/schema').Comment;
const r       = require('../database/thinky').r;

module.exports = {
  watchPosts,
  watchLikes,
  watchComments
};

function watchPosts(io) {
  Post.changes().then((feed) =>
    feed.each((error, doc) => {
      if (error) {
        console.error(error);
      }

      if (!doc.isSaved()) {
        io.emit('post-deleted', doc);
      } else if (!doc.getOldValue()) {
        doc.likes = [];
        doc.comments = [];
        io.emit('post-created', doc);
      } else {
        emitJoinPost(io, doc.id);
      }
    })
  ).catch((err) => {
    console.error(err);
  });
}

function watchLikes(io) {
  Like
    .changes()
    .then(
      feed => joinWatch(io, feed)
    ).catch((err) => {
      console.error(err);
    });
}

function watchComments(io) {
  Comment
    .changes()
    .then(
      feed => joinWatch(io, feed)
    ).catch((err) => {
      console.error(err);
    });
}

function joinWatch(io, feed) {
  return feed.each((error, doc) => {
    if (error) {
      console.error(error);
    }

    if (!doc.isSaved()) {
      // Deleted
      emitJoinPost(io, doc.postId);
    } else if (!doc.getOldValue()) {
      // Created
      emitJoinPost(io, doc.postId);
    } else {
      // Update / Not applicable
    }
  });
}

function emitJoinPost(io, postId) {
  Post
    .get(postId)
    .getJoin({
      comments : {
        _apply : sequence => sequence.orderBy(r.desc('createdAt'))
      },
      likes : true
    })
    .run()
    .then(post => io.emit('post-updated', post))
    .catch(postError => console.error('Error while fetching updated post', postError));
}
