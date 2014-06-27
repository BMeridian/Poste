/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	


  /**
   * `UsersController.create()`
   */
  create: function (req, res) {
    newuser = {
      name: req.param('name'),
      username: req.param('username'),
      email: req.param('email'),
      password: req.param('password')
    }
    Users.create(newuser, function(err, user){
      if (err || !user) return res.serverError(err)
      return res.ok(user)
    })
  },


  /**
   * `UsersController.find()`
   */
  find: function (req, res) {
    Users.find().exec(function(err, users) {
      if (err || !users) return res.serverError(err)
      return res.ok(users)
    })
  },

  /**
   * `UsersController.findOne()`
   */
  findOne: function (req, res) {
    Users.findOne({id: req.param('id')}).populate('friends').exec(function (err, user){
      if (err) return res.serverError(err)
      if (!user) return res.notFound('No User with that id')
      return res.ok(user)
    })
  },


  /**
   * `UsersController.update()`
   */
  update: function (req, res) {
    var token     = auth.token(req),
        name      = req.param('name'),
        username  = req.param('username'),
        email     = req.param('email'),
        password  = req.param('password');

    Tokens.findOne({token: token}).populate('user').exec(function (err, token){
      if (err) return res.serverError(err)
      if (!token) return res.forbidden('Invalid token')
      var user = token.user

      if (name) user.name = name;
      if (username) user.username = username;
      if (email) user.email    = email;
      if (password) user.password = password;

      user.save(function(err, user){
        if (err || !user) return res.serverError(err)
        return res.ok(user)
      });
    })
  },


  /**
   * `UsersController.destroy()`
   */
  destroy: function (req, res) {
    var token     = auth.token(req),
        password  = req.param('password');

    Tokens.findOne({token: token}).populate('user').exec(function (err, token){
      if (err) return res.serverError(err)
      if (!token) return res.notFound('Invalid Token')
      var user = token.user

      crypto.compare(password, user.password, function(err, result){
        if (err) return res.serverError(err)
        if (!result) return res.forbidden('Wrong Password')
          
        Users.destroy({id: user.id}).exec(function (err){
          if (err) return res.serverError(err)
          return res.ok('User deleted')
        })
      })
    })
  }
};

