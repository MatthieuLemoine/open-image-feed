var express = require('express');
var router  = express.Router();
var app     = express();

// Routing

router.get('/',index);

module.exports = router;

// Handlers

// Index view
function index(req, res){
    res.render('index');
}
