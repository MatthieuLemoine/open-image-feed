const db         = require('../database/database').db;
const connection = require('../database/database').connection;

class Post {
  constructor(post) {
    // sanitizer : make juste we have no extra properties
    this.id = post.id;
    this.title = post.title;
    this.image = post.image;
    this.author = post.author;
  }

  static add(post) {
    return new Promise((resolve, reject) =>
      db
        .table('posts')
        .insert(post)
        .run(connection, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        })
    );
  }

  static find() {
    return new Promise((resolve, reject) =>
      db
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
    );
  }

  static isValid(post, username) {
    if (!post.title || !post.image || post.author !== username) {
      return Promise.reject('Invalid post');
    }
    return Promise.resolve(post);
  }
}

module.exports = Post;
