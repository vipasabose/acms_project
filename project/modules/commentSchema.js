const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    
    
    cid: String,
    pver:String,
    timestamp:date
    
   
});
module.exports = mongoose.model('comment', commentSchema);
