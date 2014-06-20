/**
* Allow any authenticated user.
*/
module.exports = function(req, res, next){
  if (req.isAuthenticated()) return next();
  else return res.forbidden('You must be logged in to preform his action');
}