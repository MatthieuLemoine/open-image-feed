var mongoose = require('mongoose');
require('../models/Posts');
var Posts = mongoose.model('Posts');
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
	Posts.find({},{},{sort : {'createdAt' : '-1'}}, function(err, posts){
		if(err) console.error(err);
		data.posts = posts;
		res.json(data);
	});
};