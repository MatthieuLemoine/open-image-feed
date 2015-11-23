var mongoose   = require('mongoose');
var timestamps = require('mongoose-timestamp');

var UsersSchema = new mongoose.Schema({
    username: { type : String, required : "Username required",trim: true,index:true},
    password: { type : String, required : "Password required",trim: true}
}).plugin(timestamps);

mongoose.model('Users', UsersSchema);
