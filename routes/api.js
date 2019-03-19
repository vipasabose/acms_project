var express = require('express');
var bodyParser = require('body-parser')
var login = require('../modules/Registration');
var router = express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

//router.set('view engine','jsx');


router.get('/login',function(req,res) {
  //res.render('login');
  res.send({type: 'GET'});
});

router.post('/login',function(req,res) {
  console.log(req.body);
  res.send({
    name:req.body.name,
    rank: req.body.rank
  });
  //res.render('login');
});

router.get('/createuser-fetch',function (req,res) {
  res.render('createuser');
});

router.post('/createuser',urlencodedParser,function(req,res) {
  var user = new Registration;
});


module.exports = router;
