const express       = require('express');
const router        = express.Router();
const User          = require('../database/schema').User;
const checkPassword = require('../utils/validator').checkPassword;
const crypt         = require('../utils/crypt.js');

router
  .post('/login', (req, res, next) =>
    User
      .get(req.body.username)
      .run()
      .then(user => checkPassword(user, req.body.password))
      .then(() => res.sendStatus(200))
      .catch(next)
  )
  .post('/signup', (req, res, next) => {
    const tempUser = {
      username : req.body.username,
      password : req.body.password
    };
    // Hash password
    tempUser.salt = crypt.generateSalt();
    crypt.hashPassword(tempUser.password, tempUser.salt, (err, derivedKey) => {
      if (err) {
        next({ statusCode : 500, message : 'Error hashing password' });
      } else {
        tempUser.password = derivedKey.toString('hex');
        const user = new User(Object.assign({}, tempUser));
        user
          .save()
          .then(() => res.sendStatus(201))
          .catch(next);
      }
    });
  });

module.exports = router;
