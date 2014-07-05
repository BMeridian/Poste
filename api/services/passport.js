var passport            = require('passport')
    , util          = require('util')
    , flash = require('connect-flash')
    //, GitHubStrategy    = require('passport-github').Strategy
    //, FacebookStrategy  = require('passport-facebook').Strategy
    //, GoogleStrategy    = require('passport-google-oauth').OAuth2Strategy
    //, TwitterStrategy   = require('passport-twitter').Strategy
    , LocalStrategy     = require('passport-local').Strategy
    , BearerStrategy    = require('passport-http-bearer').Strategy
    , DigestStrategy= require('passport-http').DigestStrategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Users.findOne({id: id}).exec(function(err, user) {
    done(err, user)
  });
});

var localHandler = function localHandler(username, password, done) {
  process.nextTick(function() {
    Users.findOne({username: username}).exec(function(err, user){
      if (err) return done(err)
      if (!user) return done(null, false)

      crypto.compare(password, user.password, function(err, res) {
          if (err || !res) return done(null, false);
          return done(null, user);
      });
    })
  });
};


var tokenHandler = function tokenHandler(accessToken, done) {
  process.nextTick(function() {
    Tokens.findOne({token: accessToken}).populate('user').exec(function(err, token) {
      if (err) return done(err)
      if (!token) return done(null, false)
      return done(null, token.user, token.scopes)
    })
  });
}


/* TODO: add support for social
    passport.use(new GitHubStrategy({
      clientID: "YOUR_CLIENT_ID",
      clientSecret: "YOUR_CLIENT_SECRET",
      callbackURL: "http://localhost:1337/auth/github/callback"
    }, socialHandler));

    passport.use(new FacebookStrategy({
      clientID: "YOUR_CLIENT_ID",
      clientSecret: "YOUR_CLIENT_SECRET",
      callbackURL: "http://localhost:1337/auth/facebook/callback"
    }, socialHandler));

    passport.use(new GoogleStrategy({
      clientID: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
      callbackURL: 'http://localhost:1337/auth/google/callback'
    }, socialHandler));

    passport.use(new TwitterStrategy({
      consumerKey: 'YOUR_CLIENT_ID',
      consumerSecret: 'YOUR_CLIENT_SECRET',
      callbackURL: 'http://localhost:1337/auth/twitter/callback'
    }, socialHandler));
*/


passport.use(new LocalStrategy(localHandler));
passport.use(new BearerStrategy(tokenHandler));

// Use the DigestStrategy within Passport.
//   This strategy requires a `secret`function, which is used to look up the
//   use and the user's password known to both the client and server.  The
//   password is used to compute a hash, and authentication will fail if the
//   computed value does not match that of the request.  Also required is a
//   `validate` function, which can be used to validate nonces and other
//   authentication parameters contained in the request.
passport.use(new DigestStrategy({ qop: 'auth' },
  function(username, done) {
    // Find the user by username.  If there is no user with the given username
    // set the user to `false` to indicate failure.  Otherwise, return the
    // user and user's password.
    findByUsername(username, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, user.password);
    })
  },
  function(params, done) {
    // asynchronous validation, for effect...
    process.nextTick(function () {
      // check nonces in params here, if desired
      return done(null, true);
    });
  }
));

module.exports = passport