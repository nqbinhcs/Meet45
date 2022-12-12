var mongoose = require('mongoose');
 
var userSchema = mongoose.Schema({
    name: String,

    email: {
        type: String,
        required: true},

    password: {
        type: String,
        required: true}

});
 
var User = mongoose.model('User', userSchema);
 
module.exports = User;