/**
 * FriendsController
 *
 * @description :: Server-side logic for managing friends
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	


  /**
   * `FriendsController.create()`
   */
  create: function (req, res) {
    var token = auth.token(req),
          fid = req.param('id');

    Tokens.findOne({token: token}).populate('user').exec(function(err, token){
      if (err) return res.serverError(err)
      if (!token) return res.forbidden('Not Logged In')

      var user   = token.user;

      Users.findOne({id: fid}).exec(function(err, friend){
        if (err) return res.serverError(err)
        if(!user) return res.notFound('User doesn\'t exist, can\'t add friend')

        user.friends.add(friend.id);
        user.save(function(err,user){
          if (err) return res.serverError(err)
          friend.friends.add(user.id)
          friend.save(function(err, friend){
            if(err) return res.serverError(err)
            res.ok('Users are now friends')
          });
        });
      });
    });
  },

  /**
   * `FriendsController.destroy()`
   */
  destroy: function (req, res) {
    sails.log.debug('Hit Controller')
    var token = auth.token(req),
          fid = req.param('id');

    Tokens.findOne({token: token}).populate('user').exec(function(err, token){
      if(err) return res.serverError(err)
      if(!token) return res.forbidden('Not Logged In')

      var user = token.user;

      Users.findOne({id: fid}).exec(function(err, friend){
        if (err) return res.serverError(err)
        if(!user) return res.notFound('User doesn\'t exist, can\'t remove friend')
        user.friends.remove(friend.id);
        user.save(function(err,user){
          if (err) return res.serverError(err)
          friend.friends.remove(user.id)
          friend.save(function(err, friend){
            if(err) return res.serverError(err)
            res.ok('Users are no longer friends')
          });
        });
      });
    });
  }

};

