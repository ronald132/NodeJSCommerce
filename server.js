var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://ronald132:Password132@ds051953.mlab.com:51953/ecommerce', function(err){
  if(err) {
    console.log(err);
  }else{
    console.log("Connected to database");
  }
});

//Middleware
app.use(morgan('dev'));

app.get('/', function(req, res){
  var name = "ronald";
  res.json("My name is " + name);
});

app.listen(3000, function(err){
  if(err) throw err;
  console.log("Server is running");
});
