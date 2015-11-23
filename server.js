/**
 * Module dependencies
 */
require('./models/Posts');
require('./models/Users');
require('./models/Comments');
require('./models/Activities');
var express = require('express');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var methodOverride = require('method-override');
var errorHandler = require('express-error-handler');
var morgan = require('morgan');
var http = require('http');
var path = require('path');
var passport = require('passport');
var flash = require('connect-flash');
var dbConfig = require('./config/db');
var mongoose = require('mongoose');
var initPassport = require('./passport/init');
// Initialize Passport
initPassport(passport);
// Routes
var activity = require('./routes/activity');
var comment = require('./routes/comment');
var index = require('./routes/index');
var partials = require('./routes/partials');
var post = require('./routes/post');
var user = require('./routes/user');

var app = module.exports = express();
mongoose.connect(dbConfig.url);

// Express config

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended : true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({ secret: 'nCbRfjJ1CLwEuAq', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routing
app.use('/activity',activity);
app.use('/comment',comment);
app.use('/',index);
app.use('/partials',partials);
app.use('/post',post);
app.use('/user',user);


var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  app.use(errorHandler());
}

// production only
if (env === 'production') {
  // TODO
}

// Start Server
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
