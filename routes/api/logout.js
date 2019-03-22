const User = require('../../models/Registration');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
  app.get('verify',(req,res,next)=>{
    //get the token and verify token
    const {query }= req;
    const {token }=query;

    UserSession.findOneAndUpdate({
      _id:token,
      isDeleted:false
    },{
      $set:{
        isDeleted:true
      }
    },null,(err,sessions)=>{
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
