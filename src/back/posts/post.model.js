const r  = require('rethinkdb');
const req = require('../database/database').req;

class Post {
  constructor(post) {
    Object.assign(this, post);
  }

  static add(post) {
    return new Promise((resolve, reject) =>
      req(connection =>
        r.db('openImageFeed')
          .table('posts')
          .insert(post)
          .run(connection, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          })
      )
    );
  }

  static find() {
    return new Promise((resolve, reject) =>
      req(connection =>
        r.db('openImageFeed')
          .table('posts')
          .run(connection, (err, cursor) => {
            if (err) {
              reject(err);
            } else {
              cursor.toArray((error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              });
            }
          })
        )
    );
  }

  static isValid(post, username) {
    return new Promise((resolve, reject) => {
      if (!post.title || !post.image || post.author !== username) {
        reject({ statusCode : 400, message : 'Invalid post' });
      } else {
        resolve(post);
      }
    });
  }
}

module.exports = Post;
