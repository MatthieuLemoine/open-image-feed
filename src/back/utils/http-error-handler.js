module.exports = (err, req, res) => {
  if (err.statusCode) {
    res.status(err.statusCode).send(err);
  } else {
    res.status(500).send('Server error');
  }
};
