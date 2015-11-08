var mongoose = require('mongoose');
require('../models/Posts');
require('../models/Comments');
require('../models/Users');
require('../models/Activities');
var Post = mongoose.model('Posts');
var Comment = mongoose.model('Comments');
var User = mongoose.model('Users');
var Activity = mongoose.model('Activities');

/*
 * Serve JSON to our AngularJS client
 */

// GET feed
exports.feed = function (req, res) {
	var data = {
		posts:[]
	};
	Post.find({},{},{sort : {'createdAt' : '-1'}}).populate({path:'author',select:'username'}).exec(function(err, posts){
		if(err) console.error(err);
		data.posts = posts;
		res.json(data);
	});
};

// Create post
exports.addPost = function (req, res){
	var post = new Post();
	post.author = req.user;
	post.title = req.body.title;
	post.image = "/uploads/"+req.file.filename;
	post.save(function(err){
		if(err) {
			console.error(err);
			res.json({status: "fail"});
		}
		else {
			var activity = new Activity();
			activity.post = post;
			activity.author = req.user;
			activity.type = "POST";
			activity.save(function(err){
				if(err) console.error(err);
				res.json({status: "success"});
			});
		}
	});
};

// Add comment
exports.comment = function(req,res){
	Post.findById(req.body.post,function(err, post){
		if(err) {
			console.error(err);
			res.json({status : "fail"});
		}
		var comment = new Comment();
		comment.author = req.user;
		comment.content = req.body.content;
		comment.save(function(err){
			if(err){
				console.error(err);
				res.json({status : "fail"});
			}
			post.comments.push(comment);
			post.save(function(err){
				if(err){
					console.error(err);
					res.json({status : "fail"});
				}
				else{
					var activity = new Activity();
					activity.post = post;
					activity.author = req.user;
					activity.type = "COMMENT";
					activity.save(function(err){
						if(err) console.error(err);
						res.json({status: "success"});
					});
				}
			});
		});
	});
};

// GET comments
exports.comments = function(req,res){
	Post.findById(req.params.post).select("comments -_id").populate("comments","content author",null,{ sort: { 'createdAt': -1 } }).exec(function(err, post){
		if(err) {
			console.error(err);
			res.json({status : "fail"});
		}
		var options = {
			path: 'comments.author',
			model : 'Users',
			select: 'username -_id'
		};
		User.populate(post,options,function(err,populatedPost){
			if(err) {
				console.error(err);
				res.json({status : "fail"});
			}
			res.json(populatedPost.comments);
		});
	});
};

// Upvote a post
exports.upvote = function(req,res){
	Post.findById(req.body.post,function(err, post){
		if(err) {
			console.error(err);
			res.json({status : "fail"});
		}
		if(post.upvotes.indexOf(req.user._id) > -1){
			res.json({status : "ALREADY_UPVOTED"});
		}
		else{
			post.upvotes.push(req.user);
			post.save(function(err){
				if(err){
					console.error(err);
					res.json({status : "fail"});
				}
				else{
					var activity = new Activity();
					activity.post = post;
					activity.author = req.user;
					activity.type = "UPVOTE";
					activity.save(function(err){
						if(err) console.error(err);
						res.json({status: "success"});
					});
				}
			});
		}
	});
};

// Downvote a post
exports.downvote = function(req,res){
	Post.findById(req.body.post,function(err, post){
		if(err) {
			console.error(err);
			res.json({status : "fail"});
		}
		if(post.downvotes.indexOf(req.user._id) > -1){
			res.json({status : "ALREADY_DOWNVOTED"});
		}
		else{
			post.downvotes.push(req.user);
			post.save(function(err){
				if(err){
					console.error(err);
					res.json({status : "fail"});
				}
				else{
					var activity = new Activity();
					activity.post = post;
					activity.author = req.user;
					activity.type = "DOWNVOTE";
					activity.save(function(err){
						if(err) console.error(err);
						res.json({status: "success"});
					});
				}
			});
		}
	});
};

// GET activities
exports.activities = function(req,res){
	Activity.find({},{},{sort : {'createdAt' : '-1'}}).skip(req.query.offset).limit(req.query.number).populate([{path:'author',select:'username -_id'},{path:'post',select:'title -_id'}]).exec(function(err, activities){
		if(err) console.error(err);
		res.json(activities);
	});
};

// GET activities count
exports.activitiesCount = function(req,res){
	Activity.count({},function(err,count){
		if(err) console.error(err);
		res.json({count:count});
	});
};