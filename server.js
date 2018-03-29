//--------------------------------------
// Node Dependencies
//--------------------------------------
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
var mongoose = require('mongoose');

var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var session = require('express-session');
var expressValidator = require('express-validator');


//--------------------------------------
// DB
//--------------------------------------

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/twilio"
);

// if (process.env.NODE_ENV == 'production') {
//    mongoose.connect('');
//    } else {
//   mongoose.connect('mongodb://localhost/twilio');
//    }

var db = mongoose.connection;
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

//--------------------------------------
// Models
//--------------------------------------
var Subscriber = require('./models/Subscriber');


//--------------------------------------
// Middleware
//--------------------------------------
app.use(express.static(__dirname + '/app/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

//--------------------------------------
// Listener
//--------------------------------------
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
