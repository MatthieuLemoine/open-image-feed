const thinky = require('thinky')({
  host     : process.env.RETHINKDB_HOST || 'localhost',
  port     : process.env.RETHINKDB_PORT || 28015,
  db       : process.env.RETHINKDB_DB || 'openImageFeed',
  user     : process.env.RETHINKDB_USER,
  password : process.env.RETHINKDB_PASSWORD
});

module.exports = thinky;
