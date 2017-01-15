const crypt = require('./crypt');

// eslint-disable-next-line no-useless-escape
const forbiddenCaracters = /^[#&$£€/\\\[\]\(\){}_"@+* =°¤%§!?:;`|~,.^²<>0-9]+$/;
const PASSWORD_MIN_SIZE  = 5;
const USERNAME_MIN_SIZE  = 5;

module.exports = {
  checkPassword,
  isValidPassword,
  isValidUsername
};

function checkPassword(user, password) {
  return new Promise((resolve, reject) => {
    crypt.hashPassword(password, user.salt, (err, derivedKey) => {
      if (err) {
        reject(err);
      } else if (user.password === derivedKey.toString('hex')) {
        resolve(user);
      } else {
        reject({ statusCode : '400', message : 'Invalid password' });
      }
    });
  });
}

function isValidPassword(password) {
  return password && password.length >= PASSWORD_MIN_SIZE;
}

function isValidUsername(username) {
  return username && username.length >= USERNAME_MIN_SIZE && !forbiddenCaracters.test(username);
}
