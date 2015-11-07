
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  expressSession = require('express-session'),
  methodOverride = require('method-override'),
  errorHandler = require('express-error-handler'),
  morgan = require('morgan'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'),
  multer  = require('multer'),
  passport = require('passport'),
  flash = require('connect-flash');

var app = module.exports = express();
var dbConfig = require('./db.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);
require('./models/Posts');
require('./models/Users');
require('./models/Comments');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+"-"+file.originalname)
  }
});
var upload = multer({ storage : storage });

/**
 * Configuration
 */

// all environments
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

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);


var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  app.use(errorHandler());
}

// production only
if (env === 'production') {
  // TODO
}

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.send('Vous devez vous logger');
}
/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
// Auth
app.post('/login',passport.authenticate('login',{
  successRedirect:'/profile'
}));
app.post('/signup',passport.authenticate('signup',{
  successRedirect:'/profile'
}));
app.get('/profile',isAuthenticated,function(req,res){
  res.json({
    user : {
      id: req.user._id,
      username: req.user.username
    },
    sessionID:req.sessionID
  });
});
app.get('/signout',function(req,res){
  req.logout();
  return res.json({status : true});
});
app.get('/partials/home', routes.partials);
app.get('/partials/dialog', routes.dialog);
app.get('/partials/login', routes.loginPartial);

// JSON API
app.get('/api/feed', api.feed);
app.get('/api/comments/:post',api.comments);
app.post('/api/comment',isAuthenticated,api.comment);
app.post('/api/post',isAuthenticated,upload.single('file'),api.addPost);

// redirect all others to the index (HTML5 history)
//app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
