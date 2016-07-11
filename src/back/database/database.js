const r = require('rethinkdb');

const db = r.db('openImageFeed');

module.exports = {
  init,
  req,
  db
};

function req(request) {
  r.connect({ host : 'localhost', port : 28015 }, (err, conn) => {
    if (err) throw err;
    request(conn);
  });
}

function init(io) {
  r.connect({ host : 'localhost', port : 28015 }, (err, conn) => {
    if (err) throw err;
    // Listen to new post
    db
      .table('posts')
      .changes()
      .run(conn, (error, cursor) => {
        if (error) {
          console.error(error);
        } else {
          // Emit changes to all socket clients
          cursor.each((_, change) => {
            io.emit('post-change', change);
          });
        }
      });
  });
}
