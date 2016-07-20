const express = require('express');
const router  = express.Router();
const auth    = require('../auth/auth');
const Post    = require('../database/schema').Post;
const r       = require('../database/thinky').r;
const upload  = require('../utils/upload');

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
  .post('/', auth.isAuthenticated, upload.single('image'), (req, res, next) => {
    const author = req.user;
    if (req.file) {
      const post   = new Post({
        title    : req.body.title,
        image    : `/uploads/${req.file.filename}`,
        author
      });
      post
        .saveAll({ author : true })
        .then(() => res.sendStatus(201))
        .catch(next);
    } else {
      res.status('400').send('Image required');
    }
  });

module.exports = router;
