/**
 * User is Authenticated Policy
 *
 * @description :: Checks to make sure that a user is authed
 * @docs		:: http://sailsjs.org/#!documentation/policies
 */
module.exports = function(req, res, next){
  if (req.session['Authorization']) return next();
  else return res.forbidden('You must have a token to preform this action');
}