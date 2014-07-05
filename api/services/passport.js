var passport            = require('passport')
    //, GitHubStrategy    = require('passport-github').Strategy
    //, FacebookStrategy  = require('passport-facebook').Strategy
    //, GoogleStrategy    = require('passport-google-oauth').OAuth2Strategy
    //, TwitterStrategy   = require('passport-twitter').Strategy
    , LocalStrategy     = require('passport-local').Strategy
    , BearerStrategy		= require('passport-http-bearer').Strategy;

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

module.exports = passport