/**
* Tokens.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	user: {
  		model: 'Users',
  	},
  	token: {
  		required: true,
  		unique: true,
  		primaryKey: true
  	},
  	type: {
  		type: 'string',
  		defaultsTo: 'api'
  	},
  	scopes: {
  		type: 'array',
  		defaultsTo: ['*']
  	}
  },

  beforeValidate: function(token, cb) {
  	token.token = crypto.token();
  	return cb(null, token);
  },
  afterDestroy: function(dToken, cb) {
    Users.findOne({id: dToken.user}).exec(function(err, user){
      if (err) return cb(err);
      user.tokens.remove(dToken.id);
      user.save(function(err){
        if (err) return cb(err);
        return cb();
      })
    })
  }

};

