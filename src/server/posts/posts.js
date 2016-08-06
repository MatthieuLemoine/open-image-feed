const express = require('express');
const router  = express.Router();
const auth    = require('../auth/auth');
const Post    = require('../database/schema').Post;
const r       = require('../database/thinky').r;
const upload  = require('../utils/upload');

router
  .get('/', (req, res, next) => {
    const start = parseInt(req.query.start, 10);
    const end   = parseInt(req.query.end, 10);
    if (Number.isInteger(start) && Number.isInteger(end)) {
      return Post
        .orderBy({ index :  r.desc('createdAt') })
        .slice(start, end)
        .getJoin({
          comments : {
            _apply : sequence => sequence.orderBy(r.desc('createdAt'))
          },
          likes : true
        })
        .run()
        .then(post => res.send(post))
        .catch(next);
    }
    return res.status('400').send('Invalid offsets');
  })
  .get('/count', (req, res, next) =>
      Post
        .count()
        .execute()
        .then(count => res.json({
          count
        }))
        .catch(next)
  )
  .post('/', auth.isAuthenticated, upload.single('image'), (req, res, next) => {
    const author = req.user;
    if (req.file) {
      const post   = new Post({
        title       : req.body.title,
        image       : `/uploads/${req.file.filename}`,
        imageHeight : req.body.imageHeight,
        imageWidth  : req.body.imageWidth,
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
