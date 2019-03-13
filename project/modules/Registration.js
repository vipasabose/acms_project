const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    email: String,
    name: String,
    pname: String,
    isRename:String
   
});
module.exports = mongoose.model('Registration', registrationSchema);
