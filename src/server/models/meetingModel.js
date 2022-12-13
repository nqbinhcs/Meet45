var mongoose = require('mongoose');
 
var meetingSchema = mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },

    uid: 
    {
        type: String,
        required: true
    
    },

    creator: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }


});
 
var Meeting = mongoose.model('Meeting', meetingSchema);
 
module.exports = Meeting;