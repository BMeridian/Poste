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
      if (err) return res.serverError(err)
      if (!user) return res.notProcessed('Username or Password incorrect')
      newToken = crypto.token()
      req.session[newToken] =  user.id
      res.ok({message: 'Log in Successful', token: newToken, id: user.id})
    })(req, res);
  },


  /**
   * `AuthController.logout()`
   */
  logout: function (req, res) {
    delete req.session[req.headers['Authorization']]
    res.ok('Successful Logout')
  }
};

