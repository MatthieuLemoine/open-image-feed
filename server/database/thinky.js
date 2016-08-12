const config = require('../config.json');
const thinky = require('thinky')({
  host : config.rethinkdb_host,
  port : config.rethinkdb_port,
  db   : 'openImageFeed'
});

module.exports = thinky;
