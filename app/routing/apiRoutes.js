//--------------------------------------
// Dependencies
//--------------------------------------

// Library ** https://github.com/Datahero/node-surveymonkey **
const SurveyMonkeyAPI = require('surveymonkey').SurveyMonkeyAPI;
// Library ** https://github.com/Piotrovskyi/survey-monkey-api **
const SurveyMonkeyAPII = require('survey-monkey');

var express = require("express");
var router = express.Router();
var token = require('../../auth');
var request = require("request");

//--------------------------------------
// Using SurveyMonkey Node Libraries
//--------------------------------------

router.get("/", function(req, res) {
  // return res.json(players);
  try {
    var api = new SurveyMonkeyAPI(token.accessToken, {
      version: 'v3',
      secure: false
    });
  } catch (error) {
    console.log(error.message);
  }
  api.getSurveyList({}, function(error, data) {
    if (error)
      console.log(error.message);
    else
      return res.json(data)
    console.log(JSON.stringify(data));
  });
});

router.get("/survey", function(req, res) {
  try {
    var api = new SurveyMonkeyAPI(token.accessToken, {
      version: 'v3',
      secure: false
    });
  } catch (error) {
    console.log(error.message);
  }
  api.getSurveyDetails({
    id: '130879901'
  }, function(error, data) {
    if (error)
      console.log(error);
    else
      res.json(data)
    console.log(JSON.stringify(data));
  });
});

router.get("/responses", function(req, res) {
  try {
    var api = new SurveyMonkeyAPII(token.accessToken);
  } catch (err) {
    console.log(err.message);
  }
  api.getSurvayResponsesBulk(130879901).then(function(surveys) {
    res.json(surveys);
    list = surveys.data
    for (let i = 0; i<list.length; i++) {
      var ans = list[i].pages;
      for (let j = 0; j<ans.length; j++) {
        var answ = ans[j].questions;
        for (let k = 0; k<answ.length; k++) {
          var answe = answ[k].answers;
          for (let l = 0; l<answe.length; l++) {
            answers = answe[l]
            console.log(answers);
          }
        }
      }
    }
  }).catch(err => console.error(err))
});

//--------------------------------------
// Using Request Method
//--------------------------------------

// Returns an expanded survey resource with a pages element containing a list of all page objects, each containing a list of questions objects **-- /surveys/{id}/details --**
router.get("/survey-results", function(req, res) {

  var options = {
    method: 'GET',
    url: 'https://api.surveymonkey.com/v3/surveys/130879901/details',
    headers:
    { 'Authorization': 'bearer ' + token.accessToken,
      'Content-Type': 'application/json'
    }
 };

 request(options, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(JSON.parse(body));
  console.log(JSON.parse(body));
  });
});

// Returns a question **-- /surveys/{id}/pages/{id}/questions/{id} --**
router.get("/question-one", function(req, res) {

  var options = {
    method: 'GET',
    url: 'https://api.surveymonkey.com/v3/surveys/130879901/pages/68129708/questions/262296676',
    headers:
    { 'Authorization': 'bearer ' + token.accessToken,
      'Content-Type': 'application/json'
    }
 };

 request(options, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(JSON.parse(body));
  console.log(JSON.parse(body));
  });
});

// Returns a question **-- /surveys/{id}/pages/{id}/questions/{id} --**
router.get("/surveys", function(req, res) {

  var options = {
    method: 'GET',
    url: 'https://api.surveymonkey.com/v3/surveys/130879901',
    headers:
    { 'Authorization': 'bearer ' + token.accessToken,
      'Content-Type': 'application/json'
    }
 };

 request(options, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(JSON.parse(body));
  console.log(JSON.parse(body));
  });
});

// Creates a contact lists **-- /contact_lists --**
router.get("/contact-list", function(req, res) {

  var options = {
    method: 'POST',
    url: 'https://api.surveymonkey.com/v3/contact_lists',
    headers:
    { 'Authorization': 'bearer ' + token.accessToken,
      'Content-Type': 'application/json'
    },
    body: { name: 'API-Presentation' },
    json: true
 };

 request(options, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(body);
  var contactList = body.name //for use later  "id": "100858056"
  console.log(body.name);
  });
});

// Returns a list of all contacts **-- /contacts --**
router.get("/contacts", function(req, res) {

  var options = {
    method: 'GET',
    url: 'https://api.surveymonkey.com/v3/contacts/bulk',
    headers:
    { 'Authorization': 'bearer ' + token.accessToken,
      'Content-Type': 'application/json'
    }
 };

 request(options, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(JSON.parse(body));
  console.log(body);
  });
});

// Returns responses from a specific collector **-- collectors/{collector_id}/responses --**
router.get("/collector-responses", function(req, res) {

  var options = {
    method: 'GET',
    url: 'https://api.surveymonkey.com/v3/collectors/170356663/responses',
    headers:
    { 'Authorization': 'bearer ' + token.accessToken,
      'Content-Type': 'application/json'
    }
 };

 request(options, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(JSON.parse(body));
  // responses id = 6704871964
  });
});

// Returns message from collector **-- collectors/{collector_id}/messages --**
router.get("/messages", function(req, res) {

  var options = {
    method: 'GET',
    url: 'https://api.surveymonkey.com/v3/collectors/170356663/messages',
    headers:
    { 'Authorization': 'bearer ' + token.accessToken,
      'Content-Type': 'application/json'
    }
 };

 request(options, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(JSON.parse(body));
  // message id = 44766060
  });
});

/*
Creates multiple recipients = /collectors/{id}/messages/{id}/recipients/bulk
DON'T USE RANDOM CONTACTS ID'S or CONTACT LIST ID's - THEY WILL BE ADDED TO LIST
*/


// Creates multiple recipients to send survey to POST https://api.surveymonkey.com/v3/collectors/{collector_id}/messages/{message_id}/send
router.get("/send-survey", function(req, res) {

  var options = {
    method: 'POST',
    url: 'https://api.surveymonkey.com/v3/collectors/170356663/messages/44766060/send',
    headers:
    { 'Authorization': 'bearer ' + token.accessToken,
      'Content-Type': 'application/json'
    },
    body: { "scheduled_date": "2018-02-19T14:56:55+00:00" },
    json: true
 };

 request(options, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(JSON.parse(body));
  });
});

// Returns rollups for all questions in a survey **-- surveys/{id}/rollups --**
router.get("/rollups", function(req, res) {

  var options = {
    method: 'GET',
    url: 'https://api.surveymonkey.com/v3/surveys/130879901/rollups',
    headers:
    { 'Authorization': 'bearer ' + token.accessToken,
      'Content-Type': 'application/json'
    }
 };

 request(options, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(JSON.parse(body));
  // message id = 44766060
  });
});



module.exports = router;
