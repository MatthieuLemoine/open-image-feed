const basic         = require('basic-auth');
const User          = require('../database/schema').User;
const checkPassword = require('../utils/validator').checkPassword;

module.exports = {
  isAuthenticated
};

function isAuthenticated(req, res, next) {
  const credentials = basic(req);
  // Check is valid basic credentials
  if (!credentials || !credentials.name || !credentials.pass) {
    unauthorized(res);
  }
  // Check credentials
  User
    .get(credentials.name)
    .run()
    .then(user => checkPassword(user, credentials.pass))
    .then(user => {
      req.user = user;
      next();
    })
    .catch(() => unauthorized(res));
}

function unauthorized(res) {
  res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
  return res.sendStatus(401);
}
