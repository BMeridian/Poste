/**
 * User is Authenticated Policy
 *
 * @description :: Checks to make sure that a user is authed
 * @docs		:: http://sailsjs.org/#!documentation/policies
 */
module.exports = function(req, res, next){
  passport.authenticate('bearer', {session: false}, function(err, user, info) {
    if (err) return res.serverError(err)
    if (!user) return res.forbidden("You are not permitted to perform this action.")

    return next()
  })(req, res);
};
