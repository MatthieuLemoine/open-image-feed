require('../models/Posts');
require('../models/Activities');
var express    = require('express');
var utils      = require('../passport/utils');
var router     = express.Router();
var mongoose   = require('mongoose');
var Post       = mongoose.model('Posts');
var Activity   = mongoose.model('Activities');
var uploadConf = require('../config/upload');
var app        = express();

// Routing

router.get('/',posts);
router.get('/count',postsCount);
router.post('/upvote',utils.isAuthenticated,upvote);
router.post('/downvote',utils.isAuthenticated,downvote);
router.post('/',utils.isAuthenticated,uploadConf.upload.single('file'),addPost);

module.exports = router;

// Handlers

// Create post
function addPost(req, res){
	var post = new Post();
	post.author = req.user;
	post.title = req.body.title;
	post.image = '/uploads/'+req.file.filename;
	post.save(function(err){
		if(err) {
			console.error(err);
			res.json({status: 'fail'});
		}
		else {
			var activity = new Activity();
			activity.post = post;
			activity.author = req.user;
			activity.type = 'POST';
			activity.save(function(err){
				if(err) console.error(err);
				res.json({status: 'success'});
			});
		}
	});
}

// Upvote a post
function upvote(req,res){
	Post.findById(req.body.post,function(err, post){
		if(err) {
			console.error(err);
			res.json({status : 'fail'});
		}
		if(post.upvotes.indexOf(req.user._id) > -1){
			res.json({status : 'ALREADY_UPVOTED'});
		}
		else{
			post.upvotes.push(req.user);
			post.save(function(err){
				if(err){
					console.error(err);
					res.json({status : 'fail'});
				}
				else{
					var activity = new Activity();
					activity.post = post;
					activity.author = req.user;
					activity.type = 'UPVOTE';
					activity.save(function(err){
						if(err) console.error(err);
						res.json({status: 'success'});
					});
				}
			});
		}
	});
}

// Downvote a post
function downvote(req,res){
	Post.findById(req.body.post,function(err, post){
		if(err) {
			console.error(err);
			res.json({status : 'fail'});
		}
		if(post.downvotes.indexOf(req.user._id) > -1){
			res.json({status : 'ALREADY_DOWNVOTED'});
		}
		else{
			post.downvotes.push(req.user);
			post.save(function(err){
				if(err){
					console.error(err);
					res.json({status : 'fail'});
				}
				else{
					var activity = new Activity();
					activity.post = post;
					activity.author = req.user;
					activity.type = 'DOWNVOTE';
					activity.save(function(err){
						if(err) console.error(err);
						res.json({status: 'success'});
					});
				}
			});
		}
	});
}

// GET posts
function posts(req,res){
	Post.find({},{},{sort : {'createdAt' : '-1'}}).skip(req.query.offset).limit(req.query.number).populate({path:'author',select:'username'}).exec(function(err, posts){
		if(err) console.error(err);
		res.json(posts);
	});
}

// GET posts count
function postsCount(req,res){
	Post.count({},function(err,count){
		if(err) console.error(err);
		res.json({count:count});
	});
}
