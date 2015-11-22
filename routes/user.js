var express  = require('express');
var passport = require('passport');
var utils    = require('../passport/utils');
var router   = express.Router();
var app      = express();

// Routing

// Login POST request
router.post('/login',passport.authenticate('login',{
  successRedirect:'/user/profile'
}));
// Sign Up POST request
router.post('/signup',passport.authenticate('signup',{
  successRedirect:'/user/profile'
}));
router.get('/profile',utils.isAuthenticated,profile);
router.get('/signout',signout);

module.exports = router;

// Handlers

// GET Profile request
function profile(req,res){
  res.json({
    user : {
      id: req.user._id,
      username: req.user.username
    },
    sessionID:req.sessionID
  });
}

// Sign Out request
function signout(req,res){
  req.logout();
  return res.json({status : true});
}
