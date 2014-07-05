/**
 * Users are Friends Policy
 *
 * @description :: Checks to make sure that a users in request are not friends
 * @docs		:: http://sailsjs.org/#!documentation/policies
 */
module.exports = function(req, res, next) {
 	var token = auth.token(req),
 			fid 	= req.param('id'),
 			found;

 	Tokens.findOne({token: token}).populate('user').exec(function(err, token) {
 		if (err) return res.serverError(err)
		if (!token) return res.forbidden('Token doesn\'t exist, please authenticate')

 		if (token.user.id == fid) {
      return res.forbidden('User cannot be friends with themselves')
    }


 		Users.findOne({id: token.user.id}).populate('friends').exec(function(err, user){
 			if (err) return res.serverError(err)
 			if (!user) return res.forbidden('User doesn\'t exist')

	 		user.friends.forEach(function (friend) {
	 			sails.log.debug('Friend:')
	 			sails.log.debug(friend)
 				if (friend.id == fid) {
 					found = true;
 				}
 			});

 			if(!found) {next();}
 			else { res.badRequest('Users are friends, please defriend user before attempting this action');}
 		})
 		
 	})
 }