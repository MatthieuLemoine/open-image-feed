var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var CommentsSchema = new mongoose.Schema({
    content : String,
    author : { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
}).plugin(timestamps);

mongoose.model('Comments',CommentsSchema);
