var mongoose = require('mongoose');
 
var userSchema = mongoose.Schema({

    uid: String,

    name: String,

    email: {
        type: String,
        required: true},

    password: {
        type: String,
        required: true},

    avatar: String

});
 
var User = mongoose.model('User', userSchema);
 
module.exports = User;