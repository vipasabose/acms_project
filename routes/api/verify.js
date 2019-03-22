const User = require('../../models/Registration');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
  app.get('verify',(req,res,next)=>{
    //get the token and verify token
    const {query }= req;
    const {token }=query;

    UserSession.find({
      _id:token,
      isDeleted: false
    },(err,sessions)=>{
      if(err){
        res.status(404).send({
          success: false,
          message:'Error: Server error'});
      }
      else if(sessions.length != 1){
        res.status(404).send({
          success: false,
          message:'Error: Server error'});
      }
      else {
        res.status(300).send({
          success: true,
          message:'Session verified'
    });
  }
  });
});
};
