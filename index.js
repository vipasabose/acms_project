var express = require('express');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/api');

//setup express app
var app = express();

//connect to mongo db
mongoose.connect('mongodb://localhost/')
mongoose.Promise = global.Promise;

app.use(expressValidator());
app.use(expressSession({secret : 'max', saveUninitialized: false, resave: false}));
app.use(bodyParser.json());

//initializing routes
app.use(routes);

//listening for requests
app.listen(process.env.port || 8080);//process.env.port for heroku
