module.exports = (err, req, res) => {
  if (err.statusCode) {
    res.status(err.statusCode);
  } else {
    res.status(500).send('Server error');
  }
};
