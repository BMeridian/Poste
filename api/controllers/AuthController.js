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
    passport.authenticate('local', {'session': false}, function(err, user, info){
      sails.log.info(user)
      if (err) return res.serverError(err)
      if (!user) return res.notProcessed('Username or Password incorrect')
      Tokens.create({user: user.id}).exec(function(err,token){
        if (err || !token) return res.serverError(err)
        return res.ok(token)
      })
    })(req, res);
  },


  /**
   * `AuthController.logout()`
   */
  logout: function (req, res) {
    var reqtoken = auth.token(req)
    sails.log.info(reqtoken)
    Tokens.findOne({token: reqtoken}).exec(function(err, token){
      if (err) return res.serverError(err)
      if (!token) return res.notFound('Not Logged in')
    })
    Tokens.destroy({token: reqtoken}).exec(function(err){
      if (err) return res.serverError(err)
      return res.ok('Successful Logout')
    })
  }
};

