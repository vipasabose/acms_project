var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/api');

//setup express app
var app = express();

//connect to mongo db
mongoose.connect('mongodb://localhost/')
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

//initializing routes
app.use(routes);

//listening for requests
app.listen(process.env.port || 8080);//process.env.port for heroku
