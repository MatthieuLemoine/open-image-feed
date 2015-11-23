require('../models/Activities');
require('../models/Comments');
require('../models/Posts');
require('../models/Users');
var express  = require('express');
var utils    = require('../passport/utils');
var router   = express.Router();
var mongoose = require('mongoose');
var Activity = mongoose.model('Activities');
var Comment  = mongoose.model('Comments');
var Post     = mongoose.model('Posts');
var User     = mongoose.model('Users');

// Routing

router.get('/:post',comments);
router.post('/',utils.isAuthenticated,comment);

module.exports = router;

// Handlers

// Add comment
function comment(req,res){
	Post.findById(req.body.post,function(err, post){
		if(err) {
			console.error(err);
			res.json({status : 'fail'});
		}
		var comment = new Comment();
		comment.author = req.user;
		comment.content = req.body.content;
		comment.save(function(err){
			if(err){
				console.error(err);
				res.json({status : 'fail'});
			}
			post.comments.push(comment);
			post.save(function(err){
				if(err){
					console.error(err);
					res.json({status : 'fail'});
				}
				else{
					var activity = new Activity();
					activity.post = post;
					activity.author = req.user;
					activity.type = 'COMMENT';
					activity.save(function(err){
						if(err) console.error(err);
						res.json({status: 'success'});
					});
				}
			});
		});
	});
}

// GET comments
function comments(req,res){
	Post.findById(req.params.post).select('comments -_id').populate('comments','content author',null,{ sort: { 'createdAt': -1 } }).exec(function(err, post){
		if(err) {
			console.error(err);
			res.json({status : 'fail'});
		}
		var options = {
			path: 'comments.author',
			model : 'Users',
			select: 'username -_id'
		};
		User.populate(post,options,function(err,populatedPost){
			if(err) {
				console.error(err);
				res.json({status : 'fail'});
			}
			res.json(populatedPost.comments);
		});
	});
}
