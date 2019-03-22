var express = require('express');
var path = require('path');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
require('dotenv').config();
var mongoose = require('mongoose');


var routes = require('./routes/api/login');
var routes = require('./routes/api/createuser');
var routes = require('./routes/api/verify');
var routes = require('./routes/api/logout');

//setup express app
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'js');
//connect to mongo db
mongoose.connect(process.env.DATABASE, { useMongoClient: true });
mongoose.Promise = global.Promise;
mongoose.connection
  .on('connected', () => {
    console.log(`Mongoose connection open on ${process.env.DATABASE}`);
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });
//require('./models/product');
//require('./models/user');
app.use(express.static('views'));

app.use(expressValidator());
app.use(expressSession({secret : 'max', saveUninitialized: false, resave: false}));
app.use(bodyParser.json());

//initializing routes
app.use('/',routes);


//error handling
app.use(function (err,req,res,next) {

})

//listening for requests
app.listen(process.env.port || 8080);//process.env.port for heroku
