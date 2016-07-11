const forbiddenCaracters = /^[#&$£€/\\\[\]\(\){}_"@+* =°¤%§!?:;`|~,.^²<>0-9]+$/;
const PASSWORD_MIN_SIZE  = 5;
const USERNAME_MIN_SIZE  = 5;

module.exports = {
  isValidPassword,
  isValidUsername
};

function isValidPassword(password) {
  return password && password.length >= PASSWORD_MIN_SIZE;
}

function isValidUsername(username) {
  return username && username.length >= USERNAME_MIN_SIZE && !forbiddenCaracters.test(username);
}
