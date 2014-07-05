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

  beforeDestroy: function(criteria, cb) {
    sails.log.debug('Criteria')
    sails.log.debug(criteria)
    Tokens.findOne(criteria).populate('user').exec(function(err, token){
      if (err) cb(err);
      sails.log.debug('Token:')
      sails.log.debug(token)
      Users.findOne({id: token.user.id}).populate('tokens').exec(function(err, user) {
        if (err) cb(err);
        sails.log.debug(user)
        user.tokens.remove(token.token)
        sails.log.debug(user)
        user.save(function (err){
          if (err) return cb(err);
          return cb();
        })
      })
    })
  }
};

