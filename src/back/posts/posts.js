const express   = require('express');
const router    = express.Router();
const auth      = require('../auth/auth');
const Post      = require('./post.model');

router
  .get('/', (req, res, next) => Post
    .find()
    .then(post => res.send(post))
    .catch(next)
  )
  .post('/', auth.isAuthenticated, (req, res, next) => {
    Post
      .isValid(req.body, req.user.username)
      .then(body => new Post(body, req.user.username))
      .then(Post.add)
      .then(() => res.sendStatus(201))
      .catch(next);
  });

module.exports = router;
