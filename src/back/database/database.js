const r = require('rethinkdb');

let connection = null;
const db = r.db('open-image-feed');

module.exports = {
  init,
  connection,
  db
};

function init() {
  r.connect({ host : 'localhost', port : 28015 }, (err, conn) => {
    if (err) throw err;
    connection = conn;
  });
}
