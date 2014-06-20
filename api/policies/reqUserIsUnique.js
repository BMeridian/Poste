/**
 * Request User is Unique Policy
 *
 * @description :: Checks to make sure that the credentials a user creation request are unique
 * @docs		:: http://sailsjs.org/#!documentation/policies
 */

 module.exports = function(req, res, next) {
 	Users.findOne({
 		or: [
 			{username: req.param('username') || ' '},
 			{email: req.param('email') || ' '}
 		]
 	}, function(err, user){
 		if (err) return res.serverError(err)
 		if (user) return res.forbidden('Already Taken')
 		else return next()
 	});

 }