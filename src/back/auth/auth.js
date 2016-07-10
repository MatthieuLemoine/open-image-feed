const basic = require('basic-auth');
const User  = require('../users/user.model.js');

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
    .findByUsername(credentials.name)
    .then(user => user.checkPassword(credentials.pass))
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
