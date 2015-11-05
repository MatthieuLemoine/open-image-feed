var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var UsersSchema = new mongoose.Schema({
    username: { type : String, required : "Username required"},
    password: { type : String, required : "Password required"}
}).plugin(timestamps);

mongoose.model('Users', UsersSchema);