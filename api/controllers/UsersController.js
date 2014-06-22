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
    Users.findOne({id: req.param('id')}).exec(function (err, user){
      if (err) return res.serverError(err)
      if (!user) return res.notFound('No User with that id')
      return res.ok(user)
    })
  },


  /**
   * `UsersController.update()`
   */
  update: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  },


  /**
   * `UsersController.destroy()`
   */
  destroy: function (req, res) {
    return res.json({
      todo: 'destroy() is not implemented yet!'
    });
  }
};

