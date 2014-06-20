/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var passport = require('passport')

module.exports = {

  /**
   * `AuthController.login()`
   */
  login: function (req, res) {
    passport.authenticate('local', function(err, user, info){
      if (err) return res.serverError(err)
      if (!user) return res.notProcessed('Username or Password incorrect')
      req.login(user, function(err){
        if (err) return res.serverError(err)
        res.ok('Successful Login')
      })
    })(req, res);
  },


  /**
   * `AuthController.logout()`
   */
  logout: function (req, res) {
    req.logout();
    res.ok('Successful Logout')
  }
};

