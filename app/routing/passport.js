var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/User');

module.exports = function(passport) {

//--------------------------------------
// Passport Session Setup
//--------------------------------------

passport.serializeUser(function(user, done) {
    done(null, user.id);
    console.log(user);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      console.log(user);
        done(err, user);
    });
});


passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        process.nextTick(function() {
        User.findOne({ 'email' :  email }, function(err, user) {
            if (err)
                return done(err);
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                var newUser = new User();
                newUser.email    = email;
                newUser.password = newUser.generateHash(password);
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
        });
    }));
};
