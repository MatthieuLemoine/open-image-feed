var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var PostsSchema = new mongoose.Schema({
    title : String,
    author : { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    image : String,
    comments : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }]
}).plugin(timestamps);

mongoose.model('Posts',PostsSchema);
