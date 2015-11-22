module.exports = {
  isAuthenticated : isAuthenticated
};

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.send('You need to login');
}
