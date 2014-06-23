/**
 * User is Authenticated Policy
 *
 * @description :: Checks to make sure that a user is authed
 * @docs		:: http://sailsjs.org/#!documentation/policies
 */
module.exports = function(req, res, next){
	/*
	if (!req.session.tokens) req.session.tokens = [];
	
	sails.log.info('isAuthenticated Running')
	sails.log.info(req.session)
	token = req.headers['authorization']
	if (token) {
		if (req.session.tokens[token]) {
			Users.findOne({id: req.session.tokens[token]}).exec(function(err, user) {
				if (err) return res.serverError(err)
				if (!user) return res.forbidden('You must have a vaild token, please login')
				sails.log.info('In User lookup')
				return next()
			})
		}
	}
	else {
	sails.log.info('Token not found')
	sails.log.debug(req.headers)
	res.forbidden('You must have a vaild token, please login')
	}
	*/
	sails.log.debug('Hit isAuthenticated')

  passport.authenticate('bearer', {session: false}, function(err, user, info) {
    if (err) return res.serverError(err)
    if (!user) return res.forbidden("You are not permitted to perform this action.")

    return next()
  })(req, res);
};
