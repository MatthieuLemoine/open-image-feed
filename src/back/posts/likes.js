const express = require('express');
const router  = express.Router();
const auth    = require('../auth/auth');
const Like    = require('../database/schema').Like;
const Post    = require('../database/schema').Post;

router
  .post('/:postId', auth.isAuthenticated, (req, res, next) => {
    const author = req.user;
    const postId = req.params.postId;
    Post
      .get(postId)
      .then(post => {
        const like = new Like({
          author,
          post
        });
        return like.save();
      })
      .then(() => res.sendStatus(201))
      .catch(next);
  });

module.exports = router;
