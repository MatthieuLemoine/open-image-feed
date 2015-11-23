var mongoose   = require('mongoose');
var timestamps = require('mongoose-timestamp');

var PostsSchema = new mongoose.Schema({
    title : { type : String, required : "Title required",trim: true, index: true },
    author : { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    image : { type : String, required : "Image required" },
    comments : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }],
    upvotes : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    downvotes : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }]
}).plugin(timestamps);

mongoose.model('Posts',PostsSchema);
