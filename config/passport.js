var passport      = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


module.exports.express = {

  customMiddleware: function(app) {
    // sails.log.info('Passport Intialized')
    app.use(passport.initialize());
    app.use(passport.session());
  }
};