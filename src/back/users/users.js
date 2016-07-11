const express   = require('express');
const router    = express.Router();
const User      = require('./user.model');

router
  .post('/login', (req, res, next) =>
    User
      .isValid(req.body)
      .then(() => User.findByUsername(req.body.username))
      .then(user => user.checkPassword(req.body.password))
      .then(() => res.sendStatus(200))
      .catch(next)
  )
  .post('/signup', (req, res, next) =>
    User
      .isValidAndAvailable(new User(req.body))
      .then(User.add)
      .then(() => res.sendStatus(201))
      .catch(next)
  );

module.exports = router;
