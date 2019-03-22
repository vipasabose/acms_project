const User = require('../../models/Registration');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
  app.post('login',(req,res,next)=> {
    const {body} = req;
    const {
      pswd
    } = body;
    let {
      name
    } = body;

    if(!name){
      res.status(101).send({
        success: false,
        message: 'Username cannot be empty'
      });
    }
      if(!pswd){
        res.status(102).send({
          success: false,
          message: 'Password cannot be empty'
        });
      }
    email = email.toLowerCase();

  User.find({
    name : name
  },(err,users)=>{
    if(err){
      res.status(404).send({
        success: false,
        message:'Error: Server error'});
    }
    else if(users.length !=1){
      res.status(301).send({
        success: false,
        message:'Error: Username does not exist'
      });
    }
    else {
      const user = users[0];
      if(!user.validPassword(pswd)){
        res.status(302).send({
          success: false,
          message:'Error: Wrong password'});
      }
      else {
        //correct username password
        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err,doc)=>{
          if(err){
            res.status(404).send({
              success: false,
              message:'Error: Server error'});
          }
          else {
            res.status(200).send({
              success: true,
              message:'Logged in successfully',
              token: doc._id
            });
          }
        });
      }
    }
  });
});
};
