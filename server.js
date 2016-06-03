var express = require('express');
var morgan = require('morgan'); // this is for logging purpose
var mongoose = require('mongoose'); // this is the drive to mongodb
var bodyParser = require('body-parser'); //take the body of your request and parse it
var ejs = require('ejs'); // for templating engine
var engine = require('ejs-mate'); //extention of ejs
var session = require('express-session'); //session stored on server
var cookieParser = require('cookie-parser'); //stored on client browser
var flash = require('express-flash');
var mongoStore = require('connect-mongo')(session); //to handle session objects
var passport = require('passport'); // to handle authentication: local, fb, oauth2
var secret = require('./config/secret');
var User = require('./models/user'); //this to include the user model
var Category = require('./models/category');

var app = express();

mongoose.connect(secret.database, function(err){
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
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secret.secretKey,
  store: new mongoStore({url: secret.database, autoReconnect:true})
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//with this every routes will have user object
app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});

app.use(function(req, res, next){
  Category.find({}, function(err, categories){
    if(err) return next(err);
    res.locals.categories = categories;
    next();
  })
});

app.engine('ejs', engine);
app.set('view engine', 'ejs');

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
var adminRoutes = require('./routes/admin');
app.use(mainRoutes);
app.use(userRoutes);
app.use(adminRoutes);

//start server at port 3000
app.listen(secret.port, function(err){
  if(err) throw err;
  console.log("Server is running on port " + secret.port);
});
