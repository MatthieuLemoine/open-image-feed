var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var PostsSchema = new mongoose.Schema({
    title : String,
    author : String,
    image : String
}).plugin(timestamps);

mongoose.model('Posts',PostsSchema);
