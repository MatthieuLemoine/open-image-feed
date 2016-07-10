const crypto    = require('crypto');

module.exports = {
  hashPassword,
  generateSalt
};

function hashPassword(password, salt, callback) {
  if (!password || !salt) {
    callback('');
  }
  salt = new Buffer(salt, 'hex');
  return crypto.pbkdf2(password, salt, 100000, 512, 'sha512', callback);
}

function generateSalt() {
  return crypto.randomBytes(32).toString('hex');
}
