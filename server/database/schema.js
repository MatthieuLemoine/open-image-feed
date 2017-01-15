const thinky  = require('../database/thinky');

const r       = thinky.r;
const type    = thinky.type;

const Post = thinky.createModel('posts', {
  id          : type.string(),
  title       : type.string().required(),
  image       : type.string().required(),
  imageHeight : type.string(),
  imageWidth  : type.string(),
  createdAt   : type.date().default(r.now()),
  authorId    : type.string().required()
});
Post.ensureIndex('createdAt');

const User = thinky.createModel('users', {
  username  : type.string().required(),
  password  : type.string().required(),
  salt      : type.string().required(),
  createdAt : type.date().default(r.now())
}, {
  pk : 'username'
});

const Comment = thinky.createModel('comments', {
  id        : type.string(),
  content   : type.string().required(),
  createdAt : type.date().default(r.now()),
  authorId  : type.string().required(),
  postId    : type.string().required()
});
Comment.ensureIndex('createdAt');

const Like = thinky.createModel('likes', {
  id        : type.string(),
  createdAt : type.date().default(r.now()),
  authorId  : type.string().required(),
  postId    : type.string().required()
});

// Relations

Post.belongsTo(User, 'author', 'authorId', 'username');
Post.hasMany(Comment, 'comments', 'id', 'postId');
Post.hasMany(Like, 'likes', 'id', 'postId');

User.hasMany(Post, 'posts', 'id', 'authorId');
User.hasMany(Comment, 'comments', 'id', 'authorId');
User.hasMany(Like, 'likes', 'id', 'authorId');

Comment.belongsTo(User, 'author', 'authorId', 'username');
Comment.belongsTo(Post, 'post', 'postId', 'id');

Like.belongsTo(User, 'author', 'authorId', 'username');
Like.belongsTo(Post, 'post', 'postId', 'id');

module.exports = {
  Post,
  User,
  Comment,
  Like
};
