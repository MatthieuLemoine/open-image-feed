const forbiddenCaracters = /^[#&$£€/\\\[\]\(\){}_"@+* =°¤%§!?:;`|~,.^²<>0-9]+$/;
const PASSWORD_MIN_SIZE  = 5;
const USERNAME_MIN_SIZE  = 5;

module.exports = {
  isValidPassword,
  isValidUsername
};

function isValidPassword(password) {
  return password.length >= PASSWORD_MIN_SIZE;
}

function isValidUsername(name) {
  return name.length >= USERNAME_MIN_SIZE && !forbiddenCaracters.test(name);
}
