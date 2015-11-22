var mongoose   = require('mongoose');
var timestamps = require('mongoose-timestamp');

var ActivitiesSchema = new mongoose.Schema({
    type : { type : String, required : "Type required",trim: true,uppercase:true,enum:["POST","COMMENT","UPVOTE","DOWNVOTE"] },
    author : { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required : "Author required" },
    post : { type: mongoose.Schema.Types.ObjectId, ref: 'Posts', required : "Post required" }
}).plugin(timestamps);

mongoose.model('Activities',ActivitiesSchema);
