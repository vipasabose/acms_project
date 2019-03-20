const mongoose = require('mongoose');

const UserProjectSchema = new mongoose.Schema({
    
    name: String,
    pid: String
    
   
});
module.exports = mongoose.model('UserProject', UserProjectSchema);
