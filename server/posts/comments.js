const express = require('express');
const router  = express.Router();
const auth    = require('../auth/auth');
const Comment = require('../database/schema').Comment;
const Post    = require('../database/schema').Post;

router
  .post('/:postId', auth.isAuthenticated, (req, res, next) => {
    const author = req.user;
    const postId = req.params.postId;
    Post
      .get(postId)
      .then(post => {
        const comment = new Comment({
          content : req.body.content,
          author,
          post
        });
        return comment.saveAll({
          author : true,
          post : true
        });
      })
      .then(() => res.sendStatus(201))
      .catch(next);
  });

module.exports = router;
