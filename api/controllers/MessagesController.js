/**
 * MessagesController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	


  /**
   * `MessagesController.create()`
   */
  create: function (req, res) {
    var token = auth.token(req);

    Tokens.findOne({token: token}).populate('user').exec(function(err, token){
      if (err) return res.serverError(err)
      if (!token) return res.notFound('User doesn\'t exist')

      Chats.findOne({id: req.param('id')}).exec(function(err, chat){
        if (err) return res.serverError(err)
        if (!chat) return res.notFound('No chat with that id exists')

        var params = {
          content: req.param('content'),
          sender: token.user.id,
          chat: chat.id
        }

        Messages.create(params).exec(function(err, message){
          if (err) return res.serverError(err)

          chat.messages.add(message.id)
          chat.save(function(err){
            if (err) res.serverError(err)
            return res.ok()
          })
        })
      })
    })
  },


  /**
   * `MessagesController.read()`
   */
  find: function (req, res) {
    var token = auth.token(req),
        id = req.param('id');
        
        sails.log.info(id)

    Tokens.findOne({token: token}).populate('user').exec(function(err, token){
      if (err) return res.serverError(err)
      if (!token) return res.notFound('User doesn\'t exist')

      Chats.findOne({id: id}).populate('messages').exec(function(err, chat) {
        if (err) return res.serverError(err)
        if (!chat) return res.notFound('No chat with that id exists')

        return res.ok(chat.messages)
      })
    })
  },

  /**
   * `MessagesController.destroy()`
   */
  destroy: function (req, res) {
    var token = auth.token(req);

    Tokens.findOne({token: token}).populate('user').exec(function(err, token){
      if (err) return res.serverError(err)
      if (!token) return res.notFound('User doesn\'t exist')
      Messages.destroy({id: req.param('id')}).exec(function(err){
        if (err) return res.serverError(err)
        return res.ok('message deleted')
      })
    })
  }
};

