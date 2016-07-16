const express = require('express');
const router  = express.Router();
const auth    = require('../auth/auth');
const Post    = require('../database/schema').Post;
const r       = require('../database/thinky').r;

router
  .get('/', (req, res, next) =>
    Post
    .orderBy({ index :  r.desc('createdAt') })
    .getJoin({
      comments : {
        _apply : sequence => sequence.orderBy(r.desc('createdAt'))
      },
      likes : true
    })
    .run()
    .then(post => res.send(post))
    .catch(next)
  )
  .post('/', auth.isAuthenticated, (req, res, next) => {
    const author = req.user;
    const post   = new Post({
      title    : req.body.title,
      image    : req.body.image,
      author
    });
    post
      .saveAll({ author : true })
      .then(() => res.sendStatus(201))
      .catch(next);
  });

module.exports = router;
