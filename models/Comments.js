var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var CommentsSchema = new mongoose.Schema({
    content : { type : String, required : "Title required",trim: true },
    author : { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required : "Author required" }
}).plugin(timestamps);

mongoose.model('Comments',CommentsSchema);
