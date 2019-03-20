const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    email:  String,
    name: {
    type: String,
    required: true
  },
    pswd: {
    type: String,
    required: true
  },
    //isReviewer: Boolean

});
module.exports = mongoose.model('Registration', registrationSchema);
