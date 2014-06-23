
module.exports = {
	token: function (req) {
		var bearer = req.headers.authorization
		bearer = bearer.split('Bearer ')
		return bearer[1]
	}
}