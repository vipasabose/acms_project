var express = require('express');
var bodyParser = require('body-parser')
var createUser = require('../models/Registration');
var router = express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',function(req,res) {
  res.render('login');
  //res.send({type: 'GET'});
  //res.sendFile(__dirname,'../views/index.html');
});

router.get('/login',function(req,res,next) {
  //res.render('login');
  //res.send({type: 'GET'});

  const name = req.body.name;
  const pswd = req.body.pswd;
  User.findOne({ name: name })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('login');
      }
      bcrypt
        .compare(pswd, user.pswd)
        .then(doMatch => {
          if (doMatch) {
            //req.session.isLoggedIn = true;
            //req.session.user = user;
            //return req.session.save(err => {
              //console.log(err);
              res.redirect('contributor');
            });
          }
          req.flash('error', 'Invalid email or password.');
          res.redirect('login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('login');
        });
    })
    .catch(err => console.log(err));
});

router.post('/login',function(req,res) {
  console.log(req.body);
  /*res.send({
    name:req.body.name,
    rank: req.body.email
  });*/
  //res.render('login');
});

router.get('/createuser-fetch',function (req,res) {
  res.render('createuser');
});

router.post('/createuser',urlencodedParser,function(req,res,next) {
  /*var user = new Registration(req.body);//creating new instance
  user.save();*/
  const email = req.body.email;
  const pswd = req.body.password;
  const name = req.body.name;
  req.check('email','Invalid email address').isEmail();
  createUser.findOne({ name: name })
    .then(userDoc => {
      if (userDoc) {
        req.flash('error', 'E-Mail exists already, please pick a different one.');
        return res.redirect('createuser');
      }
      return bcrypt
        .hash(pswd, 12)
        .then(hashedPassword => {
          const registration = new Registration({
            email: email,
            pswd: hashedPassword,
            name: name
          });
          return registration.save();
        })
        .then(result => {
          res.redirect('login');
        });
    })
    .catch(err => {
      console.log(err);
    });
  //createUser.create(req.body).then(function(user){
    //console.log(user);
  //}).catch(next);//creating new instance+ saving to database
});


module.exports = router;
