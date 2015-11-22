require('../models/Activities');
var express  = require('express');
var utils    = require('../passport/utils');
var router   = express.Router();
var mongoose = require('mongoose');
var Activity = mongoose.model('Activities');
var app      = express();

// Routing

router.get('/',activities);
router.get('/count',activitiesCount);

module.exports = router;

// Handlers

// GET activities
function activities(req,res){
	Activity.find({},{},{sort : {'createdAt' : '-1'}}).skip(req.query.offset).limit(req.query.number).populate([{path:'author',select:'username -_id'},{path:'post',select:'title -_id'}]).exec(function(err, activities){
		if(err) console.error(err);
		res.json(activities);
	});
}

// GET activities count
function activitiesCount(req,res){
	Activity.count({},function(err,count){
		if(err) console.error(err);
		res.json({count:count});
	});
}
