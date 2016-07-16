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
      .then(post =>
        Like
          .filter({
            postId,
            authorId : author.username
          })
          .run()
          // Unlike
          .then((like) => {
            // Unlike
            if (like.length > 0) {
              return like[0].delete();
            }
            // Like
            const newLike = new Like({
              author,
              post
            });
            return newLike.saveAll({
              author : true,
              post : true
            });
          })
      )
      .then(() => res.sendStatus(201))
      .catch(next);
  });

module.exports = router;
