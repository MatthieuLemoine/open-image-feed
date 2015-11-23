var express = require('express');
var router  = express.Router();
var app     = express();

router.get('/home',function partials(req, res) {
    res.render('partials/home');
});

// Add post dialog
router.get('/dialog',function dialog(req, res) {
    res.render('partials/posts/dialog');
});

// Sign In & Sign Up dialog
router.get('/login',function loginPartial(req, res) {
    res.render('partials/users/login');
});


module.exports = router;
