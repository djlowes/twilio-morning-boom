//--------------------------------------
// Node Dependencies
//--------------------------------------
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var session = require('express-session');
var expressValidator = require('express-validator');

// var LocalStrategy = require('passport-local').Strategy;

//--------------------------------------
// DB
//--------------------------------------

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/surveymonkey",
  {
    useMongoClient: true
  }
);

// if (process.env.NODE_ENV == 'production') {
//    mongoose.connect('');
//    } else {
//   mongoose.connect('mongodb://localhost/surveymonkey');
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
var User = require('./models/User');
var apiRoutes = require("./app/routing/apiRoutes");
app.use('/api', apiRoutes);
require('./app/routing/passport.js')(passport)

//--------------------------------------
// Middleware
//--------------------------------------
app.use(morgan('dev'));
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

//--------------------------------------
// Passport
//--------------------------------------
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//--------------------------------------
// Routing
//--------------------------------------
require('./app/routing/routes.js')(app, passport)

//--------------------------------------
// Listener
//--------------------------------------
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
