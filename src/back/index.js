const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const posts      = require('./posts/posts');
const users      = require('./users/users');
const database   = require('database');
const app        = express();

// Connect to RethinkDB
database.init();

app.use(bodyParser.json());

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => process.stdout.write(`Server running at localhost:${PORT}\n`));

// Serve dist files
app.use(express.static(path.join(__dirname, 'dist')));

// POSTS
app.use('/posts', posts);

// USERS
app.use('/users', users);

// Send all requests to index.html
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));
