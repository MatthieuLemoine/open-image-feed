const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const posts      = require('./posts/posts');
const comments   = require('./posts/comments');
const likes      = require('./posts/likes');
const users      = require('./users/users');
const feed = require('./socket/feed');
const app        = express();

app.use(bodyParser.json({ limit : '50mb' }));

const PORT   = process.env.PORT || 8888;
const server = require('http').createServer(app);
const io     = require('socket.io')(server);
server.listen(PORT, () => process.stdout.write(`Server running at localhost:${PORT}\n`));

// Init post feed
feed.watchPosts(io);
feed.watchLikes(io);
feed.watchComments(io);

// Serve dist files
app.use(express.static(path.join(__dirname, '../../dist')));

// POSTS
app.use('/posts', posts);

// COMMENTS
app.use('/comments', comments);

// LIKES
app.use('/likes', likes);

// USERS
app.use('/users', users);

// Send all requests to index.html
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../../dist', 'index.html')));
