const db         = require('../database/database').db;
const req = require('../database/database').req;
const crypt      = require('../utils/crypt.js');
const validator  = require('../utils/validator.js');

class User {
  constructor(user) {
    Object.assign(this, user);
  }

  checkPassword(password) {
    return new Promise((resolve, reject) => {
      crypt.hashPassword(password, this.salt, (err, derivedKey) => {
        if (err) {
          reject(err);
        } else if (this.password === derivedKey.toString('hex')) {
          resolve(this);
        } else {
          reject();
        }
      });
    });
  }

  get info() { // do not send the password !
    return {
      id         : this.id,
      username   : this.username
    };
  }

  static add(user) {
    return new Promise((resolve, reject) => {
      user.salt = crypt.generateSalt();
      // Hash password
      crypt.hashPassword(user.password, user.salt, (err, derivedKey) => {
        if (err) {
          reject(err);
        } else {
          user.password = derivedKey.toString('hex');
          user.type     = 'user';
          req(connection =>
            db.table('users').insert(user).run(connection, (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            })
          );
        }
      });
    });
  }

  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      req(connection =>
        db.table('users').filter({ username }).run(connection, (err, result) => {
          if (err || result.length === 0) {
            reject(err);
          } else {
            resolve(new User(result[0]));
          }
        })
      );
    });
  }

  static isAvailable(user) {
    return new Promise((resolve, reject) => {
      User
        .findByUsername(user.username)
        .then(() => reject({ statusCode : 409 }))
        .catch((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
    });
  }

  static isValid(newUser) {
    return new Promise((resolve, reject) => {
      if (validator.isValidUsername(newUser.username)
        && validator.isValidPassword(newUser.password)) {
        User.isAvailable(newUser)
          .then(() => resolve(newUser))
          .catch(reject);
      } else {
        reject({ statusCode : 400 });
      }
    });
  }
}

module.exports = User;
