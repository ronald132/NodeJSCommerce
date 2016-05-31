var express = require('express');
var morgan = require('morgan'); // this is for logging purpose
var mongoose = require('mongoose'); // this is the drive to mongodb
var bodyParser = require('body-parser'); //take the body of your request and parse it
var ejs = require('ejs'); // for templating engine
var engine = require('ejs-mate'); //extention of ejs

var User = require('./models/user'); //this to include the user model

var app = express();

mongoose.connect('mongodb://ronald132:Password132@ds051953.mlab.com:51953/ecommerce', function(err){
  if(err) {
    console.log(err);
  }else{
    console.log("Connected to database");
  }
});

//Middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
app.use(mainRoutes);
app.use(userRoutes);

//start server at port 3000
app.listen(3000, function(err){
  if(err) throw err;
  console.log("Server is running");
});
