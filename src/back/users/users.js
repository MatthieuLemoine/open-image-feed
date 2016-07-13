const express       = require('express');
const router        = express.Router();
const User          = require('../database/schema').User;
const checkPassword = require('../utils/validator').checkPassword;
const crypt         = require('../utils/crypt.js');

router
  .post('/login', (req, res) =>
    User
      .get(req.body.username)
      .run()
      .then(user => checkPassword(user, req.body.password))
      .then(() => res.sendStatus(200))
      .catch(() => res.status(400).send('Invalid username or password'))
  )
  .post('/signup', (req, res) => {
    const tempUser = {
      username : req.body.username,
      password : req.body.password
    };
    // Hash password
    tempUser.salt = crypt.generateSalt();
    crypt.hashPassword(tempUser.password, tempUser.salt, (err, derivedKey) => {
      if (err) {
        res.status(500).send('Server error');
      } else {
        tempUser.password = derivedKey.toString('hex');
        const user = new User(Object.assign({}, tempUser));
        user
          .save()
          .then(() => res.sendStatus(201))
          .catch(() => res.status(400).send('Username already taken'));
      }
    });
  });

module.exports = router;
