var passport            = require('passport')
    , GitHubStrategy    = require('passport-github').Strategy
    , FacebookStrategy  = require('passport-facebook').Strategy
    , GoogleStrategy    = require('passport-google-oauth').OAuth2Strategy
    , TwitterStrategy   = require('passport-twitter').Strategy
    , LocalStrategy     = require('passport-local').Strategy
    , bcrypt            = require('bcrypt');

var localHandler = function localHandler(username, password, done) {
  process.nextTick(function() {
    Users.findByUsername(username, function(err, user) {
      if (err) {
        return done(null,false)
      }
      else if (user) {
        bcrypt.compare(password, user.password, function(err, res) {
          if (!res) return done(null, false, { message: 'Invalid Password'});
          return done(null, user);
        });
      }
      else {
        Users.create({
          username: username,
          password: password
        }, function(err, user) {
            return done(err, user);
        });
      }
    });
  });
};


var socialHandler = function socialHandler(token, tokenSecret, profile, done) {
  process.nextTick(function() {

    Users.findOneById(profile.id, function(err, user) {
      if (user) {
        return done(null, user);
      } 

      else {

        var data = {
          provider: profile.provider,
          uid: profile.id,
          name: profile.displayName
        };

        if (profile.emails && profile.emails[0] && profile.emails[0].value) {
          data.email = profile.emails[0].value;
        }
        if (profile.name && profile.name.givenName) {
          data.fistname = profile.name.givenName;
        }
        if (profile.name && profile.name.familyName) {
          data.lastname = profile.name.familyName;
        }

        User.create(data, function(err, user) {
          return done(err, user);
        });
      }
    });
  });
};

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({id: id}, function(err, user) {
    done(err, user)
  });
});


module.exports.express = {

  customMiddleware: function(app) {

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

    passport.use(new LocalStrategy(localHandler));

    app.use(passport.initialize());
    app.use(passport.session());
  }
};