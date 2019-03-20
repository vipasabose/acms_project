const mongoose = require('mongoose');

const commentInfoSchema = new mongoose.Schema({
    
    
    cid: String,
    comment:String,
    name:String
    
   
});
module.exports = mongoose.model('commentInfo', commentInfoSchema);
