var twilio = require('twilio');
const config = require('./config');

// Find your account sid and auth token in your Twilio account Console.
var client = new twilio(config.accountSid, config.authToken);
var body = "Hi " + process.argv[2] + ", what's happening with Twilio's website!? https://goo.gl/m332jg"

// Send the text message.
client.messages.create({
  to: process.argv[3],
  from: config.twilioNumber,
  body: body
})
  .then(message => {
      console.log(message.sid);
})
  .catch(err => console.error(err)
);
