/**
 * ChatsController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	


  /**
   * `ChatsController.create()`
   */
  create: function (req, res) {
    var fid   = req.param('id'),
        token = auth.token(req);

    Tokens.findOne({token: token}).populate('user').exec(function(err, token){
      if (err) return res.serverError(err)
      if (!token) return res.forbidden('Token invalid, please login')

      var user = token.user
      Users.findOne({id: fid}).exec(function (err, friend) {
        if (err) return res.serverError(err)
        if (!friend) return res.notFound('User doesn\'t exist, can\'t start chat')

        Chats.create({}).exec(function(err,chat){
          if (err || !chat) return res.serverError(err)
          chat.participants.add(user.id)
          chat.participants.add(friend.id)
          chat.save(function(err, chat){
            if (err) return res.serverError(err)
            return res.ok(chat.id)
          })
        })

      })
    })
  },


  /**
   * `ChatsController.find()`
   */
  find: function (req, res) {
    return res.json({
      todo: 'find() is not implemented yet!'
    });
  },


  /**
   * `ChatsController.findOne()`
   */
  findOne: function (req, res) {
    return res.json({
      todo: 'findOne() is not implemented yet!'
    });
  },


  /**
   * `ChatsController.update()`
   */
  update: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  },


  /**
   * `ChatsController.destroy()`
   */
  destroy: function (req, res) {
    return res.json({
      todo: 'destroy() is not implemented yet!'
    });
  }
};

