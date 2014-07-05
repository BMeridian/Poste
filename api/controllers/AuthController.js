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

// // curl -v -I http://127.0.0.1:3000/
// // curl -v -I --user bob:secret --digest http://127.0.0.1:3000/
// // curl -v -d "hello=world" --user bob:secret --digest http://127.0.0.1:3000/
// app.all('/',
//   // Authenticate using HTTP Digest credentials, with session support disabled.
//   passport.authenticate('digest', { session: false }),
//   function(req, res){
//     res.json({ username: req.user.username, email: req.user.email });
//   });

// // curl -v -I --user bob:secret --digest "http://127.0.0.1:3000/sessions.json?sEcho=2&iColumns=12"
// app.all('/sessions.json',
//   // Authenticate using HTTP Digest credentials, with session support disabled.
//   passport.authenticate('digest', { session: false }),
//   function(req, res){
//     res.json({ username: req.user.username, email: req.user.email });
//   });



    passport.authenticate('local', {'session': false}, function(err, user, info){
      sails.log.info(user)
      if (err) return res.serverError(err)
      if (!user) return res.notProcessed('Username or Password incorrect')
      Tokens.create({user: user.id}).exec(function(err,token){
        if (err || !token) return res.serverError(err)
        Users.findOne({id: user.id}).exec(function(err, user){
          if (err) return res.serverError(err);
          user.tokens.add(token.id)
        })
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

