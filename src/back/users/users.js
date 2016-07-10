const express   = require('express');
const router    = express.Router();
const User      = require('./user.model');

router
  .post('/signup', (req, res, next) => {
    User
      .isValid(new User(req.body))
      .then(User.add)
      .then(() => res.sendStatus(201))
      .catch(next);
  });

module.exports = router;
