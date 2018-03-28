//--------------------------------------
//Dependencies
//--------------------------------------
var express = require("express");
// var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var User = require('../../models/User.js');
var token = require('../../auth');
var request = require("request");

mongoose.Promise = global.Promise;

//--------------------------------------
// HTML
//--------------------------------------

module.exports = function(app, passport) {

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get("/survey", isLoggedIn, function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'survey.html'), {
    user: req.user
  });
});

app.get("/results", function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'results.html'));
});

app.get("/register", function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'register.html'));
});

app.get("/login", function(req, res) {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

// HTTP Standard Library
// Request ---- THIS
// Axios
// Super Agent
// Got
app.get("/home", function(req, res) {
  console.log(req.user)

  var options = {
    method: 'POST',
    url: 'https://api.surveymonkey.com/v3/contact_lists/100858056/contacts',
    headers:
    { 'Authorization': 'bearer ' + token.accessToken,
      'Content-Type': 'application/json'
    },
    body: { "email": req.user.email },
    json: true
 };

 request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
  res.sendFile(path.join(__dirname, '../public', 'home.html'));
  });
});

app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// process the signup form
app.post('/register', passport.authenticate('local-signup', {
    successRedirect : '/home', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));



};

function isLoggedIn(req, res, next) {

// if user is authenticated in the session, carry on
if (req.isAuthenticated())
    return next();
    // if they aren't redirect them to the home page
    res.redirect('/home.html');
}
