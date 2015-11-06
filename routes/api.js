var mongoose = require('mongoose');
require('../models/Posts');
var Post = mongoose.model('Posts');
/*
 * Serve JSON to our AngularJS client
 */

exports.feed = function (req, res) {
	var data = {
        posts : [
        	{
        		title : "Dummy Title",
        		author : "Dummy Author",
        		image : "http://dummy.image"
        	},
        	{
        		title : "Another Dummy Title",
        		author : "Another Dummy Author",
        		image : "http://anotherdummy.image"
        	}
        ]
    };
	Post.find({},{},{sort : {'createdAt' : '-1'}}).populate({path:'author',select:'username'}).exec(function(err, posts){
		if(err) console.error(err);
		data.posts = posts;
		res.json(data);
	});
};

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
			res.json({status: "success"});
		}
	});
};