var Bcrypt = require('bcrypt'),
    Crypto = require('crypto'),
    uuid   = require('node-uuid');

module.exports = {
	
	/**
	 * Generate a bcrypt hash from input
	 * @param  {object}   options            object of options
	 * @param  {string}   input              the input to be hashed
	 * @param  {Function} cb[err, hash]      the callback to call when hashing is finished
	 */
  generate: function(options, input, cb){
  	var saltComplexity = options.saltComplexity || 10;
    Bcrypt.genSalt(saltComplexity, function(err, salt) {
      Bcrypt.hash(input, salt, function(err, hash) {
        if(err) return cb(err);
        return cb(null, hash);
      });
    });
  },
  /**
   * Compares a given string against a hash, 
   * Bcrypt.compare returns true/false whether 
   * matches or not
   * @param  {string}   input          the string to use to compare
   * @param  {string}   hash           the hash to compare the input against
   * @param  {Function} cb[boolean]    the callback to call when comparision is done
   */
  compare: function(input, hash, cb){
  	Bcrypt.compare(input, hash, function(err, res) {
  		return cb(err, res);
    });
  },
  /**
   * Generate an md5 token from input
   * @param  {string}   input            the input to be hashed
   * @param  {Function} cb[err, hash]    the callback to call when hashing is finished
   */
  token: function (){
    return uuid.v4()
  }
}